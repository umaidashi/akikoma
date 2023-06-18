import axios from "axios";

interface IParams {
  name: string;
  password?: string;
  templateTimetableId: string;
}

export default async function createFastGroup(params: IParams) {
  try {
    const createdFastGroup: { data: { id: string } } = await axios.post(
      "/api/fastGroup",
      {
        name: params.name,
        templateTimetableId: params.templateTimetableId,
        password: params.password,
      }
    );
    return createdFastGroup.data;
  } catch (error) {
    console.log(error);
  }
}
