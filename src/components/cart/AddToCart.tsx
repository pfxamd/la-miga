import { addToCart, openCart } from '../../store/cart';

interface Props {
  id: string;
  title?: string;
  full?: boolean;
}

export default function AddToCart({ id, title = 'Añadir', full = false }: Props) {
  return (
    <button
      class={`add-button${full ? ' add-button--full' : ''}`}
      type="button"
      aria-label={`Añadir ${title === 'Añadir' ? id : title} a la cesta`}
      onClick={() => { addToCart(id); openCart(); }}
    >
      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
      <span>{title}</span>
    </button>
  );
}
