import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from './firebase';

export function useBlogs(){
    const [blog, setBlogs] = useState([])

    useEffect(()=>{
        const result = query(collection (db, 'blogs'), orderBy("createdAt","desc"))
        const unsub = onSnapshot(result, (snapShot)=>{
            const list = snapShot.docs.map(doc=>({
                id : doc.id,
                ...doc.data()
            }))
            setBlogs(list)
        })
        return ()=>unsub()
    },[])
    return blog
}

export function useBlogsLite(){
    const [blogs, setBlogs] = useState([])

    useEffect(()=>{
        const result = query(collection (db, 'blogs'), orderBy("createdAt","desc"))
        const unsub = onSnapshot(result, (snapshot) => {
        const list = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
            id: doc.id,
            title: data.title,
            imageURL: data.imageURL,
            author : data.author
            };
        });

        setBlogs(list);
        })
        return ()=>unsub()
    },[])
    return blogs;
}


export function useAuthorBlogs(uid){
    const [blog, setBlogs] = useState([])
    useEffect(()=>{
            if (!uid) return
        
            const result = query(collection(db, "blogs"),
                where("userId","==",uid),
            )
            const unsub = onSnapshot(result, (snapShot)=>{
                const list = snapShot.docs.map(doc =>({
                    id : doc.id,
                    ...doc.data()
                }))
                setBlogs(list)
            })
            return ()=>unsub()
    },[uid])
    return blog
}
