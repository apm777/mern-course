import React, { useCallback } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import LinksList from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { token } = useContext(AuthContext)
  const { loading, request } = useHttp()

  const fetchLinks = useCallback(
    async () => {
      try {
        const fetched = await request('/api/link/', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setLinks(fetched)
      } catch (e) { }
    },
    [token, request],
  )

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}
