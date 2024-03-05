import News from './_components/(sections)/(Section2MainAndRankings)/News'

export default function Home({searchParams} : {searchParams: {page: number}}) {
  console.log(searchParams);
  return (
    <>
      <News page={searchParams.page || 0}/>
    </>
  )
}
