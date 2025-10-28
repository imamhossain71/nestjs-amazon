import { Card, CardContent } from '@/components/ui/card'
import {
  getProductBySlug,
  getRelatedProductsByCategory,
} from '@/lib/actions/product.actions'
import SelectVariant from '@/components/shared/test/select-variant'
import ProductPrice from '@/components/shared/test/product-price'
import ProductGallery from '@/components/shared/test/product-gallery'
import ProductSlider from '@/components/shared/test/product-slider'
// import Rating from '@/components/shared/test/rating'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import AddToBrowsingHistory from '@/components/shared/test/add-to-browsing-history'
import { Separator } from '@/components/ui/separator'
import AddToCart from '@/components/shared/products/add-to-cart'
import { round2, generateId } from '@/lib/utils'
import RatingSummary from '@/components/shared/products/rating-summary'
import ReviewList from './review-list'
import { auth } from '@/auth'

export default async function ProductDetails(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page: string; color: string; size: string }>
}) {
  const searchParams = await props.searchParams

  const { page, color, size } = searchParams

  const params = await props.params

  const { slug } = params

  const product = await getProductBySlug(slug)

  const relatedProducts = await getRelatedProductsByCategory({
    category: product.category,
    productId: product._id,
    page: Number(page || '1'),
  })
  const session = await auth()

  return (
    <div>
      <AddToBrowsingHistory id={product._id} category={product.category} />

      <section>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
          <div className='col-span-2'>
            <ProductGallery images={product.images} />
          </div>

          <div className='col-span-2 flex flex-col gap-4 md:p-5'>
            <p className='p-medium-16 rounded-full bg-grey-500/10 text-grey-500'>
              Brand: {product.brand} | Category: {product.category}
            </p>
            <h1 className='font-bold text-lg lg:text-xl'>{product.name}</h1>
            <div className='flex items-center gap-2'>
              <RatingSummary
                avgRating={product.avgRating}
                numReviews={product.numReviews}
                asPopover
                ratingDistribution={product.ratingDistribution}
              />
            </div>
            <Separator />

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <ProductPrice
                price={product.price}
                listPrice={product.listPrice}
                isDeal={product.tags.includes('todays-deal')}
                forListing={false}
              />
            </div>

            <SelectVariant
              product={product}
              size={size || product.sizes[0]}
              color={color || product.colors[0]}
            />

            <Separator className='my-2' />

            <div className='flex flex-col gap-2'>
              <p className='p-bold-20 text-grey-600'>Description:</p>
              <p className='p-medium-16 lg:p-regular-18'>
                {product.description}
              </p>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className='p-4 flex flex-col gap-4'>
                <ProductPrice price={product.price} />

                {product.countInStock > 0 && product.countInStock <= 3 && (
                  <div className='text-destructive font-bold'>
                    {` Only ${product.countInStock} left in stock - order soon`}
                  </div>
                )}

                {product.countInStock !== 0 ? (
                  <div className='text-green-700 text-xl'>In Stock</div>
                ) : (
                  <div className='text-destructive text-xl'>Out of Stock</div>
                )}
                {product.countInStock !== 0 && (
                  <div className='flex justify-center items-center'>
                    <AddToCart
                      item={{
                        clientId: generateId(),
                        product: product._id,
                        countInStock: product.countInStock,
                        name: product.name,
                        slug: product.slug,
                        category: product.category,
                        price: round2(product.price),
                        quantity: 1,
                        image: product.images[0],
                        size: size || product.sizes[0],
                        color: color || product.colors[0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            {/* {product.countInStock !== 0 && (
              <div className='flex justify-center items-center'>
                <AddToCart
                  item={{
                    clientId: generateId(),
                    product: product._id,
                    countInStock: product.countInStock,
                    name: product.name,
                    slug: product.slug,
                    category: product.category,
                    price: round2(product.price),
                    quantity: 1,
                    image: product.images[0],
                    size: size || product.sizes[0],
                    color: color || product.colors[0],
                  }}
                />
              </div>
            )} */}
          </div>
        </div>
      </section>
      <section className='mt-10'>
        <h2 className='h2-bold mb-2' id='reviews'>
          Product.Customer Reviews
        </h2>
        <ReviewList product={product} userId={session?.user.id} />
      </section>

      <section className='mt-10'>
        <ProductSlider
          products={relatedProducts.data}
          title={`Best Sellers in ${product.category}`}
        />
      </section>

      <section>
        <BrowsingHistoryList className='mt-10' />
      </section>
    </div>
  )
}
