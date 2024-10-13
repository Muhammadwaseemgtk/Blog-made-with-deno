import { loadPost, Post } from '../../interfaces/posts.ts'
import { Handlers, PageProps } from "$fresh/server.ts";


export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) {
      return new Response("post not found", {status:404});
    }
    return ctx.render(post)



  }
}


export default function BlogPostPage(props:PageProps<Post>) {
  const post = props.data
    return (
      <div class="mt-4 mx-auto max-w-screen-md">
        <p class="text-gray-600 mt-12">
          {post.published_at.toLocaleDateString()}
        </p>
        <h1 class="text-5xl mt-2 font-bold ">
          {post.title}
        </h1>
        <div class="mt-2">{post.content}</div>
      </div>
    );
  }
  