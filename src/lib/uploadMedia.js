import { createClient } from "@supabase/supabase-js";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1dmhibmpqeWZhd2JoYnpic3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTgxMzMsImV4cCI6MjA5Nzc5NDEzM30.3jezo0TelDf_bbwnt5kSMIMyLnEAk83OArhDbG6r0xY";
const url = "https://cuvhbnjjyfawbhbzbsqr.supabase.co";
const supabase = createClient(url, key);

export function uploadMedia(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected");
        } else {
            const timestamp = new Date().getTime();
            const fileName = timestamp + "_" + file.name;

            supabase.storage
                .from("images")
                .upload(fileName, file)
                .then(() => {
                    const publicUrl = supabase.storage
                        .from("images")
                        .getPublicUrl(fileName).data.publicUrl;

                    resolve(publicUrl);
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
}

export default uploadMedia;

