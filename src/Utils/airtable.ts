import axios from "axios";

export const apikey = "keyRwwLZXvBXBhvqN";
export const getRecords = () => {
  return axios.get(
    `https://api.airtable.com/v0/appj95J43w6kJIFyg/rsvp?api_key=${apikey}&sort%5B0%5D%5Bfield%5D=CreatedAt&sort%5B0%5D%5Bdirection%5D=desc`
  );
};

export type CreateRecordPayload = {
  Name: string;
  Amount: number;
  Coming: boolean;
  Prayer?: string;
};

export const createRecord = (payload: CreateRecordPayload) => {
  return axios.post(
    `https://api.airtable.com/v0/appj95J43w6kJIFyg/rsvp?api_key=${apikey}`,
    {
      records: [
        {
          fields: payload,
        },
      ],
    }
  );
};