import React, { useState } from "react";
import Input from "../Input";
import Radio from "../Radio";
import { useCheckOverflow } from "../../Utils/common";
import Button from "../Button";
import { toast } from "react-toastify";
import css from "./Reservation.module.scss";
import { CreateRecordPayload } from "../../Utils/airtable";
import { showToast, showPromiseToast } from "../../Utils/toast";
import { createRecord } from "../../Utils/airtable";

const Reservation = () => {
  const { ref, isOverflowing } = useCheckOverflow<HTMLDivElement>();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [prayer, setPrayer] = useState("");
  const [willCome, setWillCome] = useState({ label: "", value: "" });
  const [peopleAmount, setPeopleAmount] = useState({ label: "", value: "" });

  const resetName = () => {
    setName("");
  };
  const resetPrayer = () => {
    setPrayer("");
  };
  const resetWillCome = () => {
    setWillCome({ label: "", value: "" });
  };
  const resetPeopleAmount = () => {
    setPeopleAmount({ label: "", value: "" });
  };

  const containerStyle = {
    overflowing: {
      minHeight: "100vh",
    },
    notOverflowing: {
      height: "100vh",
    },
  };

  const contentStyle = {
    overflowing: {
      overflow: "auto",
    },
    notOverflowing: {
      height: "100%",
    },
  };

  const onCompletedApiCall = () => {
    resetName();
    resetPeopleAmount();
    resetPrayer();
    resetWillCome();
    setIsLoading(false);
  };

  const onErrorIncompleteField = () => {
    showToast({
      type: "error",
      message: "Mohon isi nama & konfirmasi kehadiran Anda",
      id: "errorIncomplete",
    });
  };

  const onErrorAmountEmpty = () => {
    showToast({
      type: "error",
      message: "Mohon isi jumlah tamu Anda",
      id: "errorAmountEmpty",
    });
  };

  const submitToAirtable = (payload: CreateRecordPayload) => {
    setIsLoading(true);
    showPromiseToast({
      promiseFunction: createRecord(payload),
      pending: "Loading...",
      success: "Terima kasih atas konfirmasinya 🙏",
      error: "Terjadi kesalahan, silahkan coba kembali",
    })
      .then(() => {
        onCompletedApiCall();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className={css.container}
      style={
        isOverflowing
          ? containerStyle.overflowing
          : containerStyle.notOverflowing
      }
    >
      <div
        className={css.content}
        ref={ref}
        style={
          isOverflowing ? contentStyle.overflowing : contentStyle.notOverflowing
        }
      >
        <div
          className={`font-bodoni-moda font-medium font-32 font-letter-spacing-3 margin--large-t`}
        >
          RESERVASI
        </div>
        <div
          className={`font-bodoni-moda font-medium font-15 font-letter-spacing-1 margin--small-t padding--large-l padding--large-r font-align-center font-line-height-small`}
        >
          Untuk mencegah penyebaran virus COVID-19, kami mengharapkan konfirmasi
          kedatangan Anda pada form berikut:
        </div>
        <div className={css.formContainer}>
          <div className="margin--large-b">
            <div className="margin--large-t">
              <Input
                label="Nama"
                placeholder="Tuliskan Nama Anda"
                value={name}
                onChange={(value) => {
                  setName(value);
                }}
              />
            </div>
            <div className="margin--large-t">
              <Input
                textArea
                optional
                label="Ucapan & Doa"
                placeholder="Tuliskan Ucapan & Doa Anda"
                value={prayer}
                onChange={(value) => {
                  setPrayer(value);
                }}
              />
            </div>
            <div className="margin--large-t">
              <Radio
                name="kehadiran"
                label="Apakah Anda berkenan untuk hadir?"
                choices={[
                  {
                    label: "Ya, Hadir",
                    value: "y",
                  },
                  {
                    label: "Tidak, Saya tidak hadir",
                    value: "n",
                  },
                ]}
                onChange={(selected) => {
                  setWillCome(selected);
                }}
                selected={willCome}
              />
            </div>
            <div className="margin--large-t">
              <Radio
                name="jumlahTamue"
                label="Jumlah Tamu"
                choices={[
                  {
                    label: "1 Orang",
                    value: "1",
                  },
                  {
                    label: "2 Orang",
                    value: "2",
                  },
                ]}
                onChange={(selected) => {
                  setPeopleAmount(selected);
                }}
                selected={peopleAmount}
              />
            </div>
          </div>
          <Button
            disabled={isLoading}
            text="KIRIM"
            variant="white"
            onClick={() => {
              if (name && willCome?.value) {
                const isComing = willCome.value === "y";
                const notComing = willCome.value === "n";
                if (isComing) {
                  if (peopleAmount.value) {
                    const payload = {
                      Name: name,
                      Coming: true,
                      Amount: Number(peopleAmount.value),
                      Prayer: prayer,
                    };

                    submitToAirtable(payload);
                  } else {
                    // coming but amount is empty, show error
                    onErrorAmountEmpty();
                  }
                } else if (notComing) {
                  const payload = {
                    Name: name,
                    Coming: false,
                    Amount: 0,
                    Prayer: prayer,
                  };

                  submitToAirtable(payload);
                }
              } else {
                // fields are empty, show error
                onErrorIncompleteField();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reservation;
