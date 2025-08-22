//import { useState, useEffect } from "react";
import styles from "./InsertImage.module.scss";
// src/components/AddUser.tsx
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

const addUser = async (user: Pick<User, "name" | "email">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    return "";
  }
};

const getUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users: User[] = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as User)
  );
  return users;
};

const deleteUserById = async (userId: string): Promise<void> => {
  try {
    const userDocRef = doc(db, "users", userId); // Reference to the user document
    await deleteDoc(userDocRef); // Delete the document
    console.log(`User with ID: ${userId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user: ", error);
  }
};

// const deleteUserById = async (userId: string): Promise<void> => {
//     try {
//       const userDocRef = doc(db, 'users', userId);  // Reference to the user document
//       await deleteDoc(userDocRef);                  // Delete the document
//       console.log(`User with ID: ${userId} deleted successfully.`);
//     } catch (error) {
//       console.error('Error deleting user: ', error);
//     }
//   };

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min; // (seizure) random size change
  //return 1; //default size
}

export function InsertImage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [cardScale, setCardScale] = useState(1);

  const [didTryToAddWithoutTyping, setDidTryToAddWithoutTyping] = useState<
    string[]
  >([]);

  const addCurrentUser = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const errors = [];
    if (name.length === 0 && email.length === 0) {
      // they didn't fill out one or both of the fields
      errors.push("YOU HAVE BROKEN EVERY CONTRACT POSSIBLE CONTRACT");
    }
    if (name.length === 0) {
      errors.push("YOU HAVE BROKEN THE NAME CONTRACT");
    }
    if (email.length === 0) {
      errors.push("YOU HAVE BROKEN THE NON-EMPTY EMAIL CONTRACT");
    }
    if (!emailRegex.test(email)) {
      errors.push(
        "YOU HAVE BROKEN THE WRITE A PROPER EMAIL CONTRACT"
      );
    }
    if (!nameRegex.test(name)) {
      errors.push(
        "YOU HAVE BROKEN THE NAMES ONLY HAVE LETTERS AND SPACES CONTRACT"
      );
    }

    if (errors.length !== 0) {
      setDidTryToAddWithoutTyping(errors);
      return;
    }

    const id = await addUser({ name, email });

    setUsers((currentUsers) => {
      const updated = [...currentUsers];
      updated.push({
        id: id,
        name: name,
        email: email,
      });

      return updated;
    });

    setName("");
    setEmail("");
  };

  useEffect(() => {
    getUsers().then((result) => {
      setUsers(result);
    });
  }, []);

  useEffect(() => {
    setCardScale(getRandomNumber(0.9, 1.1));

    setDidTryToAddWithoutTyping([]);
  }, [name, email]);

  const deleteUser = (userId: string) => {
    // delete in firebase
    deleteUserById(userId);

    // delete locally
    setUsers((currentUsers) => {
      const updated = [...currentUsers];
      const indexToDelete = updated.findIndex(({ id }) => id === userId);
      updated.splice(indexToDelete, 1);

      return updated;
    });
  };

  return (
    <div className={styles.card} style={{ transform: `scale(${cardScale})` }}>
      <h3>Order Guides You!</h3>
      <input
        className={styles.ZhongliInput}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        className={styles.ZhongliInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <button className={styles.ZhongliShirtButton} onClick={addCurrentUser}>
        Join The Shrine
      </button>

      {didTryToAddWithoutTyping.length !== 0 &&
        didTryToAddWithoutTyping.map((errorMessage, i) => (
          <div key={i} style={{ color: "orange" }}>
            {errorMessage}
          </div>
        ))}

      {users.map((user, i) => (
        <div key={i}>
          Name: {user.name} | Email: {user.email}{" "}
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
