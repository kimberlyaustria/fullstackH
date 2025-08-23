import ClassroomForm from "@components/classroom/ClassroomForm";
import Header from "@components/header";
import { User } from "@types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";

const Classroom: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
  }, []);

  if (loggedInUser?.role !== "admin") {
    return (
      <>
        <Head>
          <title>{t("common:not-authorized")}</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="text-red-800 ">{t("unauthorized.message")}</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Add classroom</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <section>
          <ClassroomForm />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Classroom;
