'use server'
import getUserSession from "./getUserSession";

interface CallApiOptions {
    method?: "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE",
    contentType?: "application/json" | "multipart/form-data",
    accessToken?: string
    body?: any
}

export default async function callAPI(endpoint: string, options?: CallApiOptions) {
    const session:any = await getUserSession();
    let headerContents:any = {
        'Content-Type': options?.contentType ? options.contentType : "application/json"
    };
    if (options?.body) {
        options.body = JSON.stringify(options.body);
      }

    if (session?.accessToken) {
        headerContents = {
            ...headerContents,
            'Authorization': `Bearer ${session.accessToken}`
        }
    }

    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
        method: options?.method ?? "GET",
        headers: headerContents,
        body: options?.body,
        cache: "no-store"
    }).then(res => res.json()).catch(error => {
      console.error(error)
    }) ;
}