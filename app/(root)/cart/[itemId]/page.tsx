import CartAddItem from './cart-add-item'

export default function CartAddItemPage({
  params,
}: {
  params: { itemId: string }
}) {
  return <CartAddItem itemId={params.itemId} />
}
