import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  DocumentData,
  Query,
  CollectionReference
} from 'firebase/firestore';
import { db } from './firebase';
import { AdSpace } from '../types';

const COLLECTION_NAME = 'adspaces';

export async function createAdSpace(adspace: Omit<AdSpace, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...adspace,
      createdAt: new Date(),
      status: 'available'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating adspace:', error);
    throw error;
  }
}

export async function updateAdSpace(id: string, data: Partial<AdSpace>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating adspace:', error);
    throw error;
  }
}

export async function deleteAdSpace(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting adspace:', error);
    throw error;
  }
}

export async function getAdSpaces(filters?: {
  type?: string;
  ownerId?: string;
  status?: string;
}): Promise<AdSpace[]> {
  try {
    let q: Query<DocumentData> | CollectionReference<DocumentData> = collection(db, COLLECTION_NAME);
    
    if (filters) {
      const conditions = [];
      if (filters.type) conditions.push(where('type', '==', filters.type));
      if (filters.ownerId) conditions.push(where('ownerId', '==', filters.ownerId));
      if (filters.status) conditions.push(where('status', '==', filters.status));
      
      q = query(q, ...conditions, orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AdSpace[];
  } catch (error) {
    console.error('Error getting adspaces:', error);
    throw error;
  }
}

export async function searchAdSpaces(searchTerm: string): Promise<AdSpace[]> {
  try {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or ElasticSearch
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('title'),
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AdSpace[];
  } catch (error) {
    console.error('Error searching adspaces:', error);
    throw error;
  }
}
