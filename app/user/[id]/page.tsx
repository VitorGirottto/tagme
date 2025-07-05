"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PostCard } from "@/components/PostCard"

interface UserProfile {
  id: number
  name: string
  email: string
  biography: string
  created_at: string
  posts: Array<{
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
  }>
}

export default function UserProfilePage() {
  const params = useParams()
  const { user: currentUser } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchUserProfile(params.id as string)
    }
  }, [params.id])

  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`)
      if (!response.ok) {
        throw new Error("Usuário não encontrado")
      }
      const data = await response.json()
      setUserProfile(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePostDeleted = (postId: number) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        posts: userProfile.posts.filter((post) => post.id !== postId),
      })
    }
  }

  const handlePostUpdated = (updatedPost: any) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        posts: userProfile.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!userProfile) {
    return null
  }

  const isOwnProfile = currentUser?.id === userProfile.id

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{isOwnProfile ? "Meu Perfil" : `Perfil de ${userProfile.name}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <p className="mt-1 text-gray-900">{userProfile.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Biografia</label>
                <p className="mt-1 text-gray-900">{userProfile.biography || "Nenhuma biografia adicionada."}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Membro desde</label>
                <p className="mt-1 text-gray-900">{new Date(userProfile.created_at).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Posts de {userProfile.name} ({userProfile.posts.length})
          </h2>

          {userProfile.posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">
                  {isOwnProfile ? "Você ainda não criou nenhum post." : "Este usuário ainda não criou nenhum post."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {userProfile.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                  onPostDeleted={handlePostDeleted}
                  onPostUpdated={handlePostUpdated}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
