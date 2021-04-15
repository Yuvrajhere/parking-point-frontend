import "./LandingPage.css";

import Button from "../smallerComponents/Button";
import LandingNavbar from "../smallerComponents/LandingNavbar";
import BrandLogo from "../smallerComponents/BrandLogo";

import { Link, NavLink, useHistory } from "react-router-dom";

import googlePlayBadge from "../../assets/images/google-play-badge.png";

import hand from "../../assets/images/hand.png";
import boyOnRocket from "../../assets/images/boy-on-rocket.png";
import iconSearchFilled from "../../assets/images/icon-search-filled.svg";
import iconParkingFilled from "../../assets/images/icon-parking-filled.svg";
import yellowDottedPattern from "../../assets/images/yellow-dotted-pattern.svg";
import iconMapPinAddFilled from "../../assets/images/icon-map-pin-add-filled.svg";

import billyCoin from "../../assets/images/billy_coin.png";
import billySafe from "../../assets/images/billy_safe.png";
import billySearch from "../../assets/images/billy_search.png";
import billySecure from "../../assets/images/billy_secure.png";

import iconDiscord from "../../assets/images/icon_discord.png";
import iconGithub from "../../assets/images/icon_github.png";
import iconTwitter from "../../assets/images/icon_twitter.png";
import iconLinkedin from "../../assets/images/icon_linkedin.png";
import iconInstagram from "../../assets/images/icon_instagram.png";

import iconTwitterBlack from "../../assets/images/icon_twitter_black.png";
import iconGithubBlack from "../../assets/images/icon_github_black.png";
import iconDiscordBlack from "../../assets/images/icon_discord_black.png";
import iconLinkedinBlack from "../../assets/images/icon_linkedin_black.png";
import iconInstagramBlack from "../../assets/images/icon_instagram_black.png";

const LandingPage = () => {
  const history = useHistory();

  return (
    <div className="LandingPage">
      <main className="main-container">
        <LandingNavbar />
        <div className="main-a">
          <h1>
            Find parkings with <br />
            <span>one click</span>
          </h1>
          <p>
            Avoid unnecessary roaming by finding
            <span> the best and the most secure parkings</span> at a price you
            like, instantly.
          </p>
          <div className="main-a-btns">
            <Button
              buttonType="pri-btn"
              handleClick={() => {
                history.push("/signup");
              }}
            >
              Signup
            </Button>
            <Button
              buttonType="sec-btn"
              handleClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          </div>
        </div>
        <div className="main-b">
          <div>
            <p>Trusted By</p>
            <h2>50000</h2>
            <p>Registered Users</p>
          </div>
          <div>
            <p>Parkings From</p>
            <h2>50+</h2>
            <p>Cities</p>
          </div>
          <div>
            <p>Partnered With Over</p>
            <h2>1000</h2>
            <p>Parking Providers</p>
          </div>
          <div>
            <p>Our Users Booked</p>
            <h2>250000+</h2>
            <p>Parkings Around The Globe</p>
          </div>
        </div>
      </main>
      <section className="working">
        <img className="floats" src={hand} />
        <img className="floats" src={boyOnRocket} />
        <h1>How it Works</h1>
        <div id="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">
              <img src={iconSearchFilled} />
            </div>
            <div className="timeline-content">
              Login and Search with City names
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">
              <img src={iconMapPinAddFilled} />
            </div>
            <div className="timeline-content right">
              Select and Book your desired Parking Space
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon">
              <img src={iconParkingFilled} />
            </div>
            <div className="timeline-content">
              Get navigated and Park your vehicle
            </div>
          </div>
        </div>
      </section>
      <section className="features">
        <img className="floats" src={yellowDottedPattern} />
        <img className="floats" src={yellowDottedPattern} />
        <img className="floats" src={yellowDottedPattern} />
        <h1>Why Parking point</h1>
        <h1>Why Parking point</h1>
        <div className="features-list">
          <div className="feature">
            <img src={billySearch} />
            <h2>Convenient Parking</h2>
            <p>Easily find and book nearest parkings.</p>
          </div>
          <div className="feature">
            <img src={billySecure} />
            <h2>Safe and Secure</h2>
            <p>No worries of theft and penalties.</p>
          </div>
          <div className="feature">
            <img src={billyCoin} />
            <h2>Cashless Booking</h2>
            <p>Book instantly using the in-app coins.</p>
          </div>
          <div className="feature">
            <img src={billySafe} />
            <h2>Covid-19 protected</h2>
            <p>Assured Sanitized Parking spaces.</p>
          </div>
        </div>
      </section>
      <footer>
        <nav>
          <BrandLogo />
          <ul>
            <li>
              <NavLink to="/" activeClassName="active" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active" exact>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" activeClassName="active" exact>
                Signup
              </NavLink>
            </li>
          </ul>
          <Link className="playstore-badge" to="/playstore">
            <img src={googlePlayBadge} />
          </Link>
        </nav>
        <div className="footer-content">
          <div className="footer-info">
            <h2>About Project</h2>
            <p>
              This Web Application is developed as a college project and does
              not aim to provide true services to its users. The whole Web
              Application works as intended but you wont be getting any actual
              parking using this Web App. Find the code and read more from
              <a href="https://github.com/Yuvrajhere/parking-point-frontend"> this Github Repo</a>.
            </p>
          </div>
          <div className="contact">
            <h2>Contact Me</h2>
            <p>
              If you have a nice story to tell, mail me at
              <a href="https://gmail.com/"> yuvrajisbest13@gmail.com</a> or you
              can connect with me on below platforms.
            </p>
            <div className="contact-links">
              <a href="https://github.com/Yuvrajhere">
                <img src={iconGithubBlack} />
                <img src={iconGithub} />
              </a>
              <a href="https://www.linkedin.com/in/yuvraj-singh-chouhan-008953147/">
                <img src={iconLinkedinBlack} />
                <img src={iconLinkedin} />
              </a>
              <a href="https://twitter.com/YuvrajS23650613">
                <img src={iconTwitterBlack} />
                <img src={iconTwitter} />
              </a>
              <a href="https://www.instagram.com/yuvraj_singh_c/">
                <img src={iconInstagramBlack} />
                <img src={iconInstagram} />
              </a>
              <a href="https://discordapp.com/users/301767714685321226/">
                <img src={iconDiscordBlack} />
                <img src={iconDiscord} />
              </a>
            </div>
          </div>
        </div>
        <p>
          Developed with ❤️ by <span>Yuvraj Singh Chouhan</span>.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
