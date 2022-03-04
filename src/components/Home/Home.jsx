import TweetsForm from "../TweetsForm/TweetsForm";
import TweetsList from "../TweetList/TweetsList";

function Home() {
  return (
    <div className="col-12">
      <TweetsForm />
      <TweetsList />
    </div>
  );
}

export default Home;
