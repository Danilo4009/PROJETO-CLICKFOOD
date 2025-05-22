import React from "react";
import Banner from "../../components/Banner";
import { ContainerPage, TitlePage } from "../../components/Main";
import Stores from "../../components/Stores";
const Page = () => {
  return (
    <ContainerPage>
      <TitlePage>Seja Bem Vindo!</TitlePage>
      <Banner interval={4000} />
      <Stores />
    </ContainerPage>
  );
};

export default Page;
