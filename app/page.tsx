"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { PostCard } from "@/components/PostCard"
import { CreatePostForm } from "@/components/CreatePostForm"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface Post {
  id: number
  title: string
  content: string
  created_at: string
  author: {
    id: number
    name: string
  }
  comments: Array<{
    id: number
    content: string
    created_at: string
    user: {
      id: number
      name: string
    }
  }>
  likes: Array<{
    id: number
    user_id: number
  }>
}

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Erro ao buscar posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts])
    setShowCreateForm(false)
  }

  const handlePostDeleted = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600">Compartilhe suas ideias com o mundo</p>
        </div>

        {isAuthenticated && (
          <div className="mb-8">
            {!showCreateForm ? (
              <Button onClick={() => setShowCreateForm(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Criar novo post
              </Button>
            ) : (
              <CreatePostForm onPostCreated={handlePostCreated} onCancel={() => setShowCreateForm(false)} />
            )}
          </div>
        )}

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum post encontrado</p>
              {isAuthenticated && <p className="text-gray-400 mt-2">Seja o primeiro a criar um post!</p>}
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={user}
                onPostDeleted={handlePostDeleted}
                onPostUpdated={handlePostUpdated}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
