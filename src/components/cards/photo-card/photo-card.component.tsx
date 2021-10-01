import Image from '../../image/image.component'
import { Styles } from './photo-card.styles'

interface PhotoCardProps {
  img: string
  title: string
}

export default function PhotoCard({ img, title }: PhotoCardProps) {
  return (
    <Styles>
      <Image src={img} className="photo-card__img" />

      <div className="photo-card__info">
        <span className="photo-card__text">{title}</span>
      </div>
    </Styles>
  )
}
