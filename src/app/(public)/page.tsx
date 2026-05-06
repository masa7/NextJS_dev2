import { getPosts, searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from "@/types/post"

type SearchParams = {
  search? : string
}

export default async function PostsPage(
  {searchParams}:{searchParams: Promise<SearchParams>}) {
  
  const resolvedSearchParams = await searchParams
  //const query = resolvedSearchParams.search || ''

  // 配列が返ってきた場合はスペースで結合し、そうでなければ文字列として扱う
  const rawQuery = resolvedSearchParams.search
  const query = Array.isArray(rawQuery) ? rawQuery.join(' ') : (rawQuery || '')
  
  const posts = query 
  ? await searchPosts(query) as Post[]
  : await getPosts() as Post[]
  //const posts = await getPosts() as Post[]
  
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post)=>(
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    </div>
    </>
  )
}
