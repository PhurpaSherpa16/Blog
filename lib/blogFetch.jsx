import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export default async function BlogFetch() {
    const blogCollectionRef = collection(db, "blogs");
    const snapShot = await getDocs(blogCollectionRef);
    const blogsList = snapShot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    return blogsList;
}

export const getBlogById = async (id) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {id: docSnap.id, ...docSnap.data()};
    } else {
        console.log("No such document!");
        return null;
    }
}

