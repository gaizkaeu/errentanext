import './heading-text-style.css'

export const HeadingText = () => {

  return (
    <>
    <span className="heading-line heading-line-first md:inline-block">
      <span className="heading-line-gradient">Cerca.</span>
    </span>
    <span className="heading-line heading-line-second md:inline-block">
      <span className="heading-line-gradient">Rápida.</span>
    </span>
    <span className="heading-line heading-line-third md:inline-block">
      <span className="heading-line-gradient">Segura.</span>
    </span>
    </>
  )
}