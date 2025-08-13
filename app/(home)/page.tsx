import { HomeCarousel } from '@/components/ui/shared/home/home-carousal'
import data from '@/lib/data'

export default function Home() {
  return <HomeCarousel items={data.carousels} />
}
