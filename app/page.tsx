import Feed from '@components/Feed'

const Home: React.FC = () => {
  return (
    <section className="w-full flex center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Filler text to show the effects of the stylings
      </p>
      <Feed/>
    </section>
  )
}

export default Home