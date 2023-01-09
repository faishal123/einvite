import React, { useEffect, useState } from "react";
import MobileWrapper from "../../Components/MobileWrapper";
import FirstPage from "../../Components/FirstPage";
import Reservation from "../../Components/Reservation";
import { getRecords } from "../../Utils/airtable";
import QuranPage from "../../Components/QuranPage";
import Prayers from "../../Components/Prayers";
import { SinglePrayerType, RecordsFromAirtable } from "../../Utils/types";

const Home = () => {
  const [showFull, setShowFull] = useState(false);
  const [prayers, setPrayers] = useState<SinglePrayerType[]>([]);

  const getPrayers = () => {
    getRecords()
      .then((res) => {
        setPrayers(
          res.data?.records?.reduce(
            (a: SinglePrayerType[], c: RecordsFromAirtable["0"]) => {
              return [
                ...a,
                { name: c?.fields?.Name, prayer: c?.fields?.Prayer },
              ];
            },
            []
          )
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getPrayers();
  }, []);

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
          <Reservation
            onCompletedCreateRecords={() => {
              getPrayers();
            }}
          />
          <Prayers prayers={prayers} />
        </>
      )}
    </MobileWrapper>
  );
};

export default Home;
