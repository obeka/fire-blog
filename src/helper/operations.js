import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc  } from "firebase/firestore";
import { db } from "./firebase";

export const createBlog = async (blogData, user) => {
  await addDoc(collection(db, "blogs"), {
    ...blogData,
    created_at: new Date(),
    created_by: user.currentUser.email,
    like: 0,
  });
};

export const getSingleBlog = async (blogId) => {
  const docRef = doc(db, "blogs", blogId);
  return await getDoc(docRef);
};

export const updateSingleBlog = async (blogId, data, user) => {
  const blogRef = doc(db, "blogs", blogId);

  await updateDoc(blogRef, {
    ...data,
    updated_by: user.currentUser.email,
    updated_at: new Date(),
  });
};

export const deleteSinglePost = async (blogId) => {
  await deleteDoc(doc(db, "blogs", blogId));
}
