import { HomeCarousel } from '@/components/ui/shared/home/home-carousal'
import { HomeCard } from '@/components/ui/shared/home/home-card'
import { toSlug } from '@/lib/utils'
import ProductSlider from '@/components/ui/shared/product /product-slider'

import { Card, CardContent } from '@/components/ui/card'
import {
  getProductsForCard,
  getAllCategories,
  getProductsByTag,
} from '@/lib/actions/product.actions'
import data from '@/lib/data'

export default async function Home() {
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
  })
  const featureds = await getProductsForCard({
    tag: 'featured',
  })
  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
  })
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Featured Products',
      items: featureds,
      link: {
        text: 'Shop Now',
        href: '/search?tag=new-arrival',
      },
    },
  ]
  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title='Todays Deals' products={todaysDeals} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
