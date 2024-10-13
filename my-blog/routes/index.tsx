import { PageProps, Handlers } from "$fresh/server.ts";
import { listPosts } from "../interfaces/posts.ts";
import { Post } from '../interfaces/posts.ts'


export const handler: Handlers<Post[]> = {
  async GET(_req, ctx){
    const posts = await listPosts();
    return ctx.render(posts)
  }
}

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data
  return (
    <div class="mt-4 mx-auto max-w-screen-md">
      <h1 class="text-5xl mt-12 font-bold "> This is My Blog</h1>
      <ul>
        {posts.map((post) => <PostEntry post = {post}/>)}
      </ul>
    </div>
  );
}

function PostEntry(props: { post:Post }){
  const post = props.post
  return <li class="border-t py-6">
    <a href={`/blog/${post.id}`} class='flex py-2 gap-4 group'>
    <div>{post.published_at.toLocaleDateString()}</div>
    <div>
      <h2 class='font-bold text-xl group-hover:underline'>{post.title}</h2>
      <p class='text-gray-600'>{post.snippet}</p>
    </div>
    </a>
  </li>
}
