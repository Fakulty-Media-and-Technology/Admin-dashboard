export const uploadImage = async (data: FormData, token: string) =>
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/superadmin/media/upload-image`,
    {
      method: "POST",
      headers: {
        "superadmin-auth": `${token}`,
      },
      body: data,
    }
  );
