import { extract } from 'https://deno.land/std@0.145.0/encoding/front_matter.ts'




export interface Post{
    id: string,
    title: string,
    published_at: Date,
    snippet: string,
    content: string,
}

export async function loadPost(id:string): Promise<Post | null> {
    let text:string;
    try {
        text = await Deno.readTextFile(`./data/posts/${id}.md`);
    } catch (err){
        if (err instanceof Deno.errors.NotFound){
            return null;
        }
        throw err;
    }
    const { attrs, body} = extract(text);
    const params = attrs as Record<string, string>;
    const published_at = new Date(params.published_at);
    return {
        id,
        title: params.title,
        published_at,
        snippet: params.snippet,
        content: body
    }

};


export async function listPosts(): Promise<Post[]> {
    const promises = [];
    for await (const entry of Deno.readDir("./data/posts")) {
        const id = entry.name.slice(0, -3);
        promises.push(loadPost(id))
    }
    const posts = await Promise.all(promises) as Post[];
    posts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
    return posts;


}