import { STORES_ROUTE } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {
  StyledFeaturesContainer,
  StyledGalleryWrapper,
  StyledMainInfoContainer,
} from './SingleProductPage.styled';
import { db } from '@/app/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Medicine } from '@/types';
// import {
//   GalerySkeletonLoader,
//   SingleProductInfoSkeletonLoader,
//   SingleProductMainInfoSkeletonLoader,
// } from '@/components';
type Props = {};
type Params = {
  productID: string;
};

export const SingleProductPage = (props: Props) => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? STORES_ROUTE);
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { productID } = useParams<Params>();
  const data = [
    {
      id: '1',
      medicineTitle: 'Paracetamol',
      pharmacies: [
        {
          name: 'Pharmacy A',
          price: 4.99,
          filialsCoordinates: [
            { lat: 40.7128, lng: -74.006 },
            { lat: 41.8781, lng: -87.6298 },
          ],
        },
        {
          name: 'Pharmacy B',
          price: 5.49,
          filialsCoordinates: [{ lat: 34.0522, lng: -118.2437 }],
        },
      ],
      price: 4.99,
      category: 'Pain Relief',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/paracetamol1.jpg',
        'https://example.com/images/paracetamol2.jpg',
        'https://example.com/images/paracetamol3.jpg',
      ],
      stockQuantity: 200,
      tradeName: 'Tylenol',
      activeIngredients: ['Paracetamol'],
      termOfSale: 'Without a prescription',
      countryOfManufacture: 'USA',
      pharmaGroup: 'Analgesic',
    },
    {
      id: '2',
      medicineTitle: 'Ibuprofen',
      pharmacies: [
        {
          name: 'Pharmacy C',
          price: 5.5,
          filialsCoordinates: [
            { lat: 37.7749, lng: -122.4194 },
            { lat: 29.7604, lng: -95.3698 },
          ],
        },
        {
          name: 'Pharmacy D',
          price: 6.0,
          filialsCoordinates: [{ lat: 32.7767, lng: -96.797 }],
        },
      ],
      price: 5.5,
      category: 'Anti-inflammatory',
      medicineTypes: ['Tablet', 'Gel'],
      img: [
        'https://example.com/images/ibuprofen1.jpg',
        'https://example.com/images/ibuprofen2.jpg',
        'https://example.com/images/ibuprofen3.jpg',
      ],
      stockQuantity: 150,
      tradeName: 'Advil',
      activeIngredients: ['Ibuprofen'],
      termOfSale: 'Without a prescription',
      countryOfManufacture: 'Canada',
      pharmaGroup: 'NSAID',
    },
    {
      id: '3',
      medicineTitle: 'Amoxicillin',
      pharmacies: [
        {
          name: 'Pharmacy E',
          price: 12.99,
          filialsCoordinates: [
            { lat: 32.7157, lng: -117.1611 },
            { lat: 33.4484, lng: -112.074 },
          ],
        },
      ],
      price: 12.99,
      category: 'Antibiotic',
      medicineTypes: ['Capsule', 'Suspension'],
      img: [
        'https://example.com/images/amoxicillin1.jpg',
        'https://example.com/images/amoxicillin2.jpg',
        'https://example.com/images/amoxicillin3.jpg',
      ],
      stockQuantity: 80,
      tradeName: 'Amoxil',
      activeIngredients: ['Amoxicillin'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'USA',
      pharmaGroup: 'Penicillin',
    },
    {
      id: '4',
      medicineTitle: 'Loratadine',
      pharmacies: [
        {
          name: 'Pharmacy F',
          price: 6.25,
          filialsCoordinates: [
            { lat: 39.7392, lng: -104.9903 },
            { lat: 36.1627, lng: -86.7816 },
          ],
        },
        {
          name: 'Pharmacy G',
          price: 6.5,
          filialsCoordinates: [{ lat: 40.4406, lng: -79.9959 }],
        },
      ],
      price: 6.25,
      category: 'Antihistamine',
      medicineTypes: ['Tablet', 'Syrup'],
      img: [
        'https://example.com/images/loratadine1.jpg',
        'https://example.com/images/loratadine2.jpg',
        'https://example.com/images/loratadine3.jpg',
      ],
      stockQuantity: 250,
      tradeName: 'Claritin',
      activeIngredients: ['Loratadine'],
      termOfSale: 'Without a prescription',
      countryOfManufacture: 'Mexico',
      pharmaGroup: 'Antihistamine',
    },
    {
      id: '5',
      medicineTitle: 'Omeprazole',
      pharmacies: [
        {
          name: 'Pharmacy H',
          price: 9.99,
          filialsCoordinates: [
            { lat: 33.4484, lng: -112.074 },
            { lat: 40.7128, lng: -74.006 },
          ],
        },
        {
          name: 'Pharmacy A',
          price: 10.49,
          filialsCoordinates: [{ lat: 41.8781, lng: -87.6298 }],
        },
      ],
      price: 9.99,
      category: 'Digestive Health',
      medicineTypes: ['Capsule'],
      img: [
        'https://example.com/images/omeprazole1.jpg',
        'https://example.com/images/omeprazole2.jpg',
        'https://example.com/images/omeprazole3.jpg',
      ],
      stockQuantity: 100,
      tradeName: 'Prilosec',
      activeIngredients: ['Omeprazole'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'France',
      pharmaGroup: 'Proton Pump Inhibitor',
    },
    {
      id: '6',
      medicineTitle: 'Cetirizine',
      pharmacies: [
        {
          name: 'Pharmacy B',
          price: 5.99,
          filialsCoordinates: [{ lat: 47.6062, lng: -122.3321 }],
        },
        {
          name: 'Pharmacy C',
          price: 6.29,
          filialsCoordinates: [{ lat: 37.3382, lng: -121.8863 }],
        },
      ],
      price: 5.99,
      category: 'Antihistamine',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/cetirizine1.jpg',
        'https://example.com/images/cetirizine2.jpg',
        'https://example.com/images/cetirizine3.jpg',
      ],
      stockQuantity: 180,
      tradeName: 'Zyrtec',
      activeIngredients: ['Cetirizine'],
      termOfSale: 'Without a prescription',
      countryOfManufacture: 'Germany',
      pharmaGroup: 'Antihistamine',
    },
    {
      id: '7',
      medicineTitle: 'Aspirin',
      pharmacies: [
        {
          name: 'Pharmacy D',
          price: 3.75,
          filialsCoordinates: [{ lat: 42.3601, lng: -71.0589 }],
        },
      ],
      price: 3.75,
      category: 'Pain Relief',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/aspirin1.jpg',
        'https://example.com/images/aspirin2.jpg',
        'https://example.com/images/aspirin3.jpg',
      ],
      stockQuantity: 300,
      tradeName: 'Bayer',
      activeIngredients: ['Acetylsalicylic Acid'],
      termOfSale: 'Without a prescription',
      countryOfManufacture: 'USA',
      pharmaGroup: 'NSAID',
    },
    {
      id: '8',
      medicineTitle: 'Dextromethorphan',
      pharmacies: [
        {
          name: 'Pharmacy F',
          price: 4.5,
          filialsCoordinates: [{ lat: 39.7684, lng: -86.1581 }],
        },
      ],
      price: 4.5,
      category: 'Cough Suppressant',
      medicineTypes: ['Syrup'],
      img: [
        'https://example.com/images/dextromethorphan1.jpg',
        'https://example.com/images/dextromethorphan2.jpg',
        'https://example.com/images/dextromethorphan3.jpg',
      ],
      stockQuantity: 120,
      tradeName: 'Robitussin',
      activeIngredients: ['Dextromethorphan'],
      termOfSale: 'Without a prescription',
      countryOfManufacture: 'USA',
      pharmaGroup: 'Cough Suppressant',
    },
    {
      id: '9',
      medicineTitle: 'Metformin',
      pharmacies: [
        {
          name: 'Pharmacy G',
          price: 8.75,
          filialsCoordinates: [{ lat: 38.9072, lng: -77.0369 }],
        },
      ],
      price: 8.75,
      category: 'Diabetes',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/metformin1.jpg',
        'https://example.com/images/metformin2.jpg',
        'https://example.com/images/metformin3.jpg',
      ],
      stockQuantity: 90,
      tradeName: 'Glucophage',
      activeIngredients: ['Metformin Hydrochloride'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'India',
      pharmaGroup: 'Biguanide',
    },
    {
      id: '10',
      medicineTitle: 'Simvastatin',
      pharmacies: [
        {
          name: 'Pharmacy H',
          price: 9.99,
          filialsCoordinates: [
            { lat: 25.7617, lng: -80.1918 },
            { lat: 39.9612, lng: -82.9988 },
          ],
        },
      ],
      price: 9.99,
      category: 'Cholesterol',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/simvastatin1.jpg',
        'https://example.com/images/simvastatin2.jpg',
        'https://example.com/images/simvastatin3.jpg',
      ],
      stockQuantity: 200,
      tradeName: 'Zocor',
      activeIngredients: ['Simvastatin'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'Netherlands',
      pharmaGroup: 'Statin',
    },
    {
      id: '11',
      medicineTitle: 'Lisinopril',
      pharmacies: [
        {
          name: 'Pharmacy A',
          price: 5.49,
          filialsCoordinates: [{ lat: 43.6532, lng: -79.3832 }],
        },
      ],
      price: 5.49,
      category: 'Hypertension',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/lisinopril1.jpg',
        'https://example.com/images/lisinopril2.jpg',
        'https://example.com/images/lisinopril3.jpg',
      ],
      stockQuantity: 70,
      tradeName: 'Zestril',
      activeIngredients: ['Lisinopril'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'UK',
      pharmaGroup: 'ACE Inhibitor',
    },
    {
      id: '12',
      medicineTitle: 'Amlodipine',
      pharmacies: [
        {
          name: 'Pharmacy B',
          price: 6.75,
          filialsCoordinates: [{ lat: 45.5017, lng: -73.5673 }],
        },
      ],
      price: 6.75,
      category: 'Hypertension',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/amlodipine1.jpg',
        'https://example.com/images/amlodipine2.jpg',
        'https://example.com/images/amlodipine3.jpg',
      ],
      stockQuantity: 50,
      tradeName: 'Norvasc',
      activeIngredients: ['Amlodipine Besylate'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'Spain',
      pharmaGroup: 'Calcium Channel Blocker',
    },
    {
      id: '13',
      medicineTitle: 'Ciprofloxacin',
      pharmacies: [
        {
          name: 'Pharmacy C',
          price: 11.99,
          filialsCoordinates: [{ lat: 44.9778, lng: -93.265 }],
        },
      ],
      price: 11.99,
      category: 'Antibiotic',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/ciprofloxacin1.jpg',
        'https://example.com/images/ciprofloxacin2.jpg',
        'https://example.com/images/ciprofloxacin3.jpg',
      ],
      stockQuantity: 60,
      tradeName: 'Cipro',
      activeIngredients: ['Ciprofloxacin'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'India',
      pharmaGroup: 'Fluoroquinolone',
    },
    {
      id: '14',
      medicineTitle: 'Levothyroxine',
      pharmacies: [
        {
          name: 'Pharmacy D',
          price: 7.5,
          filialsCoordinates: [{ lat: 49.2827, lng: -123.1207 }],
        },
      ],
      price: 7.5,
      category: 'Thyroid',
      medicineTypes: ['Tablet'],
      img: [
        'https://example.com/images/levothyroxine1.jpg',
        'https://example.com/images/levothyroxine2.jpg',
        'https://example.com/images/levothyroxine3.jpg',
      ],
      stockQuantity: 100,
      tradeName: 'Synthroid',
      activeIngredients: ['Levothyroxine Sodium'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'Germany',
      pharmaGroup: 'Thyroid Hormone',
    },
    {
      id: '15',
      medicineTitle: 'Esomeprazole',
      pharmacies: [
        {
          name: 'Pharmacy E',
          price: 9.25,
          filialsCoordinates: [{ lat: 51.0447, lng: -114.0719 }],
        },
      ],
      price: 9.25,
      category: 'Digestive Health',
      medicineTypes: ['Capsule'],
      img: [
        'https://example.com/images/esomeprazole1.jpg',
        'https://example.com/images/esomeprazole2.jpg',
        'https://example.com/images/esomeprazole3.jpg',
      ],
      stockQuantity: 85,
      tradeName: 'Nexium',
      activeIngredients: ['Esomeprazole Magnesium'],
      termOfSale: 'Prescription required',
      countryOfManufacture: 'Sweden',
      pharmaGroup: 'Proton Pump Inhibitor',
    },
  ];

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
  useEffect(() => {
    const getMedicine = async () => {
      setLoading(true);
      const docRef = doc(db, 'medicines', `${productID}`);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as Medicine;
      if (data) {
        setMedicine(data);
        setLoading(false);
      }
    };
    getMedicine();
  }, []);

  const onClick = async () => {
    await Promise.all(
      data.map(async item => {
        return await setDoc(doc(db, 'medicines', item.id), item);
      }),
    );
  };
  return (
    <div>
      <NavLink to={backLinkRef.current}>Back</NavLink>
      <StyledMainInfoContainer>
        {loading ? // <GalerySkeletonLoader />
        null : (
          <StyledGalleryWrapper>
            <ImageGallery
              items={images}
              thumbnailPosition={'left'}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </StyledGalleryWrapper>
        )}
        {loading ? // <SingleProductMainInfoSkeletonLoader />
        null : (
          <div className="contentInfo">
            <h1 className="contentInfoName">{medicine?.tradeName}</h1>
            <p className="contentInfoPrice">${medicine?.price}</p>
            <button
              type="button"
              className="contentInfoButton"
              onClick={onClick}
            >
              Find in pharmacies
            </button>
          </div>
        )}
      </StyledMainInfoContainer>
      {loading ? // <SingleProductInfoSkeletonLoader />
      null : (
        <StyledFeaturesContainer>
          <h2 className="featuresTitle">Features</h2>
          <ul className="list">
            <li className="listItem">
              <span className="listItemName">Category</span>{' '}
              <span className="listItemValue">{medicine?.category}</span>
            </li>
            <li className="listItem">
              <span className="listItemName">Trade name</span>{' '}
              <span className="listItemValue">{medicine?.tradeName}</span>
            </li>
            <li className="listItem">
              <span className="listItemName">Active ingredients</span>{' '}
              <span className="listItemValue">
                {medicine?.activeIngredients}
              </span>
            </li>
            <li className="listItem">
              <span className="listItemName">Form of release</span>{' '}
              <span className="listItemValue">
                {medicine?.medicineTypes.join(', ')}
              </span>
            </li>
            <li className="listItem">
              <span className="listItemName">Term of sale</span>{' '}
              <span className="listItemValue">{medicine?.termOfSale}</span>
            </li>
            <li className="listItem">
              <span className="listItemName">Country of manufacture</span>{' '}
              <span className="listItemValue">
                {medicine?.countryOfManufacture}
              </span>
            </li>
            <li className="listItem">
              <span className="listItemName">Pharma Group</span>{' '}
              <span className="listItemValue">{medicine?.pharmaGroup}</span>
            </li>
          </ul>
        </StyledFeaturesContainer>
      )}
    </div>
  );
};
