import React, { useEffect, useState } from "react";
import MobileWrapper from "../../Components/MobileWrapper";
import FirstPage from "../../Components/FirstPage";
import Reservation from "../../Components/Reservation";
import QuranPage from "../../Components/QuranPage";

const Home = () => {
  const [showFull, setShowFull] = useState(false);

  const scrollToQuran = () => {
    const quranElement = document.getElementById("quranPage");
    if (quranElement) {
      quranElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (showFull) {
      scrollToQuran();
    }
  }, [showFull]);
  return (
    <MobileWrapper>
      <FirstPage
        onClickCta={() => {
          if (showFull) {
            scrollToQuran();
          } else {
            setShowFull(true);
          }
        }}
      />
      {showFull && (
        <>
          <QuranPage />
          <Reservation />
        </>
      )}
    </MobileWrapper>
  );
};

export default Home;
