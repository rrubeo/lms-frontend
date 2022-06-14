import { l_endpoint } from "../../../data/list_endpoint";

export default function handler(req, res) {
  res.status(200).json(l_endpoint);
}
