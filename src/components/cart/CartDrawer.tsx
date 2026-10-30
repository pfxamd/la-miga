import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { products, withBase } from '../../data/products';
import { createWhatsAppOrderUrl } from '../../lib/whatsapp';
import { resolveOrder } from '../../lib/order';
import {
  $cart, $cartOpen, closeCart, openCart, setCartQuantity, removeFromCart,
} from '../../store/cart';

const configuredPhone = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '';

export default function CartDrawer() {
  const cart = useStore($cart, { ssr: 'initial' });
  const isOpen = useStore($cartOpen);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  const itemCount = cart.reduce((n, item) => n + item.quantity, 0);
  const order = useMemo(() => resolveOrder(cart, products), [cart]);
  const message = useMemo(() => [
    'Hola, LA MIGA. Quiero hacer este pedido:',
    ...order.lines.map((item) => `• ${item.name} × ${item.quantity} — ${item.quantity * item.unitPriceMAD} MAD`),
    `Total: ${order.totalMAD} MAD`,
    '¿Podéis confirmar la disponibilidad y el horario de recogida?',
  ].join('\n'), [order]);

  const phoneReady = /^[1-9]\d{7,14}$/.test(configuredPhone.replace(/\D/g, ''));
  const checkoutUrl = phoneReady && !order.unavailable.length && order.lines.length
    ? createWhatsAppOrderUrl(configuredPhone, order.lines)
    : '';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => { setCopied(false); }, [cart]);

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      const field = document.getElementById('order-text') as HTMLTextAreaElement | null;
      field?.select();
    }
  }

  return (
    <>
      <button type="button" class="cart-trigger" aria-label={`Abrir cesta, ${itemCount} productos`} onClick={openCart}>
        <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 8h16l-1 12H5L4 8ZM9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <span class="cart-trigger__label">Tu cesta</span>
        <span class="cart-trigger__count">{itemCount}</span>
      </button>
      <dialog ref={dialogRef} class="cart-dialog" aria-label="Tu cesta" onClose={closeCart} onClick={(event) => {
        if (event.target === dialogRef.current) closeCart();
      }}>
        <div class="cart-sheet">
          <header class="cart-sheet__head">
            <div><span class="eyebrow">LA MIGA · TU PEDIDO</span><h2>Tu cesta <span>({itemCount})</span></h2></div>
            <button class="icon-button" type="button" aria-label="Cerrar cesta" onClick={closeCart}>×</button>
          </header>
          {cart.length ? (
            <>
              <div class="cart-items">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return (
                    <div class="cart-missing" key={item.productId}>
                      Producto descatalogado.
                      <button type="button" onClick={() => removeFromCart(item.productId)}>Quitar</button>
                    </div>
                  );
                  return (
                    <div class="cart-item" key={item.productId}>
                      <div class="cart-item__image"><img src={withBase(product.image)} alt="" width="96" height="96" loading="lazy"/></div>
                      <div class="cart-item__body">
                        <strong>{product.name}</strong>
                        <small>{product.weightGrams} g · {product.priceMAD} MAD</small>
                        <div class="qty-control">
                          <button type="button" aria-label={`Quitar una unidad de ${product.name}`} onClick={() => setCartQuantity(product.id, item.quantity - 1)}>−</button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button type="button" aria-label={`Añadir una unidad de ${product.name}`} onClick={() => setCartQuantity(product.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button class="cart-remove" type="button" onClick={() => removeFromCart(product.id)} aria-label={`Eliminar ${product.name}`}>×</button>
                    </div>
                  );
                })}
              </div>
              <div class="cart-sheet__footer">
                {order.unavailable.length > 0 && <p class="cart-alert">Hay productos no disponibles en tu cesta. Elimínalos para continuar.</p>}
                <div class="cart-total"><span>Total estimado</span><strong>{order.totalMAD} MAD</strong></div>
                <p class="cart-note">Confirmamos disponibilidad y recogida por WhatsApp. Sin pago online.</p>
                {checkoutUrl ? (
                  <a class="checkout-button" href={checkoutUrl} target="_blank" rel="noopener noreferrer" aria-label="Preparar pedido en WhatsApp">
                    Pedir por WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div class="preview-order">
                    {!phoneReady && <p class="cart-note">Pedido de demostración: todavía no hay número de WhatsApp configurado.</p>}
                    <textarea id="order-text" readOnly rows={4} value={message} aria-label="Resumen del pedido" />
                    <button class="checkout-button" type="button" disabled={!!order.unavailable.length || !order.lines.length} onClick={copyOrder}>
                      {copied ? 'Pedido copiado' : 'Copiar resumen del pedido'}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div class="cart-empty">
              <span aria-hidden="true">◎</span>
              <h3>Tu cesta está vacía.</h3>
              <p>Algo bueno está esperando a salir del horno.</p>
              <button type="button" class="button-secondary" onClick={closeCart}>Explorar nuestros panes</button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
