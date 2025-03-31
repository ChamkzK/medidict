import { 
  MedicalTerm, 
  InsertMedicalTerm, 
  SearchHistory,
  InsertSearchHistory 
} from "@shared/schema";

export interface IStorage {
  // Medical Terms operations
  getMedicalTerm(id: number): Promise<MedicalTerm | undefined>;
  getMedicalTermByName(term: string): Promise<MedicalTerm | undefined>;
  searchMedicalTerms(searchTerm: string): Promise<MedicalTerm[]>;
  getSuggestions(partial: string, limit?: number): Promise<string[]>;
  insertMedicalTerm(term: InsertMedicalTerm): Promise<MedicalTerm>;
  getRandomTerm(): Promise<MedicalTerm | undefined>;
  
  // Search History operations
  recordSearch(search: InsertSearchHistory): Promise<SearchHistory>;
}

// Sample medical terms data
const sampleMedicalTerms: MedicalTerm[] = [
  // Medical Procedures
  {
    id: 13,
    term: "Laparoscopy",
    definition: "A minimally invasive surgical procedure that uses a thin, lighted tube with a camera (laparoscope) inserted through small incisions in the abdomen to examine organs and diagnose conditions or perform surgical procedures.",
    pronunciation: "/ˌlæpəˈrɒskəpi/",
    type: "Procedure",
    symptoms: null,
    relatedTerms: ["Minimally invasive surgery", "Keyhole surgery", "Laparotomy", "Endoscopy"]
  },
  {
    id: 14,
    term: "Angioplasty",
    definition: "A procedure to open narrowed or blocked blood vessels that supply blood to the heart. It is often done using a balloon catheter to dilate the vessel, frequently with placement of a stent to help keep the vessel open.",
    pronunciation: "/ˈænʤiəˌplæsti/",
    type: "Procedure",
    symptoms: null,
    relatedTerms: ["Percutaneous coronary intervention", "Balloon angioplasty", "Coronary stent", "Atherosclerosis"]
  },
  {
    id: 15,
    term: "Colonoscopy",
    definition: "A medical procedure in which a long, flexible tube with a camera (colonoscope) is used to examine the entire inner lining of the colon and rectum for polyps, ulcers, inflammation, and other abnormalities.",
    pronunciation: "/ˌkoʊlənˈɒskəpi/",
    type: "Procedure",
    symptoms: null,
    relatedTerms: ["Endoscopy", "Polyp removal", "Colorectal cancer screening", "Sigmoidoscopy"]
  },
  
  // Medical Specialties
  {
    id: 16,
    term: "Cardiology",
    definition: "A branch of medicine that deals with disorders of the heart and the cardiovascular system. The field includes medical diagnosis and treatment of congenital heart defects, coronary artery disease, heart failure, valvular heart disease, and electrophysiology.",
    pronunciation: "/kɑːˈdɪələdʒi/",
    type: "Specialty",
    symptoms: null,
    relatedTerms: ["Cardiologist", "Cardiovascular", "Heart disease", "Echocardiogram", "Electrocardiogram"]
  },
  {
    id: 17,
    term: "Neurology",
    definition: "A branch of medicine concerned with the study and treatment of disorders of the nervous system. The nervous system is a complex, sophisticated system that regulates and coordinates body activities.",
    pronunciation: "/nʊˈrɒlədʒi/",
    type: "Specialty",
    symptoms: null,
    relatedTerms: ["Neurologist", "Nervous system", "Brain", "Spinal cord", "Peripheral nerves", "Stroke", "Multiple sclerosis"]
  },
  {
    id: 18,
    term: "Ophthalmology",
    definition: "A branch of medicine and surgery that deals with the diagnosis and treatment of disorders of the eye. An ophthalmologist is a physician who specializes in eye and vision care.",
    pronunciation: "/ˌɒfθælˈmɒlədʒi/",
    type: "Specialty",
    symptoms: null,
    relatedTerms: ["Ophthalmologist", "Optometry", "Vision", "Retina", "Cataract", "Glaucoma", "Refractive surgery"]
  },
  
  // Anatomical Terms
  {
    id: 19,
    term: "Cerebrum",
    definition: "The largest part of the brain, consisting of two hemispheres divided by a deep fissure. It is responsible for higher brain functions including voluntary muscle activity, reasoning, memory, sensory processing, and visual processing.",
    pronunciation: "/səˈriːbrəm/",
    type: "Anatomy",
    symptoms: null,
    relatedTerms: ["Brain", "Cerebral cortex", "Frontal lobe", "Parietal lobe", "Temporal lobe", "Occipital lobe"]
  },
  {
    id: 20,
    term: "Myocardium",
    definition: "The muscular tissue of the heart. It is the middle layer of the heart wall and is responsible for contracting and relaxing the heart chambers to pump blood throughout the body.",
    pronunciation: "/ˌmaɪəˈkɑːdiəm/",
    type: "Anatomy",
    symptoms: null,
    relatedTerms: ["Heart muscle", "Cardiac muscle", "Epicardium", "Endocardium", "Cardiomyopathy"]
  },
  {
    id: 21,
    term: "Pancreas",
    definition: "A glandular organ located in the abdomen that has both exocrine and endocrine functions. It produces digestive enzymes and hormones such as insulin and glucagon that regulate blood sugar levels.",
    pronunciation: "/ˈpæŋkriəs/",
    type: "Anatomy",
    symptoms: null,
    relatedTerms: ["Insulin", "Glucagon", "Digestive enzymes", "Pancreatitis", "Pancreatic cancer", "Diabetes mellitus"]
  },
  
  // Common Medications/Drugs
  {
    id: 22,
    term: "Aspirin",
    definition: "A medication used to reduce pain, fever, or inflammation. Low doses of aspirin are also used long-term to help prevent heart attacks, strokes, and blood clot formation in people at high risk for developing blood clots.",
    pronunciation: "/ˈæsprɪn/",
    type: "Medication",
    symptoms: null,
    relatedTerms: ["Acetylsalicylic acid", "NSAID", "Antiplatelet", "Analgesic", "Anti-inflammatory"]
  },
  {
    id: 23,
    term: "Metformin",
    definition: "An oral medication that is used to treat type 2 diabetes by decreasing glucose production in the liver, decreasing intestinal absorption of glucose, and improving insulin sensitivity.",
    pronunciation: "/mɛtˈfɔːmɪn/",
    type: "Medication",
    symptoms: null,
    relatedTerms: ["Antidiabetic", "Oral hypoglycemic", "Type 2 diabetes", "Insulin resistance", "Biguanide"]
  },
  
  {
    id: 1,
    term: "Hypertension",
    definition: "A condition in which the blood pressure in the arteries is elevated, requiring the heart to work harder than normal to circulate blood through the blood vessels. Hypertension is typically defined as blood pressure above 140/90 and is considered severe if the pressure is above 180/120.",
    pronunciation: "/ˌhaɪpərˈtenʃən/",
    type: "Condition",
    symptoms: ["Most people with high blood pressure have no symptoms", "Severe hypertension may cause headaches", "Chest pain or shortness of breath", "Visual changes", "Blood in urine"],
    relatedTerms: ["Essential hypertension", "Secondary hypertension", "Hypertensive crisis", "Blood pressure"]
  },
  {
    id: 2,
    term: "Myocardial infarction",
    definition: "Also known as a heart attack, myocardial infarction occurs when blood flow decreases or stops to a part of the heart, causing damage to the heart muscle. The most common symptom is chest pain or discomfort which may travel into the shoulder, arm, back, neck or jaw.",
    pronunciation: "/maɪəˈkɑɹdiəl ɪnˈfɑɹkʃən/",
    type: "Condition",
    symptoms: ["Chest pain or discomfort", "Shortness of breath", "Pain in one or both arms, the back, neck, jaw or stomach", "Cold sweat", "Fatigue", "Lightheadedness or sudden dizziness"],
    relatedTerms: ["Heart attack", "Coronary thrombosis", "Acute coronary syndrome", "Ischemic heart disease"]
  },
  {
    id: 3,
    term: "Diabetes mellitus",
    definition: "A group of metabolic disorders characterized by high blood sugar levels over a prolonged period. Symptoms often include frequent urination, increased thirst, and increased hunger. If left untreated, diabetes can cause many complications including diabetic ketoacidosis, hyperosmolar hyperglycemic state, or death.",
    pronunciation: "/ˌdaɪəˈbiːtiːz ˈmɛlɪtəs/",
    type: "Condition",
    symptoms: ["Frequent urination", "Increased thirst", "Increased hunger", "Weight loss", "Fatigue", "Blurred vision"],
    relatedTerms: ["Type 1 diabetes", "Type 2 diabetes", "Gestational diabetes", "Prediabetes", "Insulin resistance"]
  },
  {
    id: 4,
    term: "Hyperthyroidism",
    definition: "A condition in which the thyroid gland produces an excessive amount of the thyroid hormone thyroxine. This can accelerate the body's metabolism significantly, causing sudden weight loss, a rapid or irregular heartbeat, sweating, and nervousness or irritability.",
    pronunciation: "/ˌhaɪpərˈθaɪrɔɪdɪzəm/",
    type: "Condition",
    symptoms: ["Weight loss", "Rapid heartbeat", "Irregular heartbeat", "Sweating", "Nervousness", "Irritability", "Fatigue", "Muscle weakness", "Sleep problems"],
    relatedTerms: ["Graves' disease", "Thyroid storm", "Thyrotoxicosis", "Goiter", "Thyroid nodule"]
  },
  {
    id: 5,
    term: "Osteoarthritis",
    definition: "A type of joint disease that results from breakdown of joint cartilage and underlying bone. The most common symptoms are joint pain and stiffness. Initially, symptoms may occur only following exercise, but over time may become constant.",
    pronunciation: "/ˌɒstiəʊɑːˈθraɪtɪs/",
    type: "Condition",
    symptoms: ["Joint pain", "Stiffness", "Decreased range of motion", "Swelling", "Bone spurs", "Grating sensation"],
    relatedTerms: ["Degenerative joint disease", "Arthritis", "Rheumatoid arthritis", "Joint replacement"]
  },
  {
    id: 6,
    term: "Pneumonia",
    definition: "An inflammatory condition of the lung primarily affecting the small air sacs known as alveoli. Symptoms typically include cough, chest pain, fever, and difficulty breathing. The cause is typically bacterial or viral infection.",
    pronunciation: "/nuːˈmoʊniə/",
    type: "Condition",
    symptoms: ["Cough with phlegm", "Fever", "Chills", "Difficulty breathing", "Chest pain", "Fatigue", "Confusion (especially in older adults)"],
    relatedTerms: ["Bronchopneumonia", "Lobar pneumonia", "Walking pneumonia", "Aspiration pneumonia"]
  },
  {
    id: 7,
    term: "Bronchitis",
    definition: "An inflammation of the bronchi (large and medium-sized airways) in the lungs that causes coughing, often with mucus, and other symptoms. Bronchitis can be acute or chronic.",
    pronunciation: "/brɒŋˈkaɪtɪs/",
    type: "Condition",
    symptoms: ["Persistent cough", "Production of mucus", "Wheezing", "Shortness of breath", "Chest discomfort", "Fatigue", "Low fever"],
    relatedTerms: ["Acute bronchitis", "Chronic bronchitis", "COPD", "Bronchiolitis"]
  },
  {
    id: 8,
    term: "Asthma",
    definition: "A common long-term inflammatory disease of the airways of the lungs. It is characterized by variable and recurring symptoms, reversible airflow obstruction, and easily triggered bronchospasms.",
    pronunciation: "/ˈæzmə/",
    type: "Condition",
    symptoms: ["Shortness of breath", "Wheezing", "Chest tightness", "Coughing", "Difficulty sleeping due to breathing problems", "Fatigue"],
    relatedTerms: ["Bronchial asthma", "Exercise-induced asthma", "Allergic asthma", "Occupational asthma", "Inhaler"]
  },
  {
    id: 9,
    term: "Gastroenteritis",
    definition: "An inflammation of the gastrointestinal tract involving both the stomach and the small intestine. It typically results in diarrhea, vomiting, and abdominal pain. Most cases are caused by viral or bacterial infections.",
    pronunciation: "/ˌɡæstrəʊɛntəˈraɪtɪs/",
    type: "Condition",
    symptoms: ["Diarrhea", "Vomiting", "Abdominal pain", "Fever", "Dehydration", "Headache", "Muscle pain"],
    relatedTerms: ["Stomach flu", "Food poisoning", "Viral gastroenteritis", "Norovirus", "Rotavirus"]
  },
  {
    id: 10,
    term: "Migraine",
    definition: "A neurological condition characterized by recurrent headaches that can be severe and disabling. Migraines can cause throbbing pain, typically on one side of the head, and may be accompanied by other symptoms.",
    pronunciation: "/ˈmaɪɡreɪn/",
    type: "Condition",
    symptoms: ["Throbbing headache", "Sensitivity to light", "Sensitivity to sound", "Nausea", "Vomiting", "Visual disturbances (aura)", "Tingling or numbness in extremities"],
    relatedTerms: ["Migraine with aura", "Migraine without aura", "Chronic migraine", "Vestibular migraine", "Hemiplegic migraine"]
  },
  {
    id: 11,
    term: "Hypothyroidism",
    definition: "A condition in which the thyroid gland doesn't produce enough thyroid hormone. Hypothyroidism can cause a number of health problems, such as obesity, joint pain, infertility and heart disease.",
    pronunciation: "/ˌhaɪpəˈθaɪrɔɪdɪzəm/",
    type: "Condition",
    symptoms: ["Fatigue", "Weight gain", "Cold intolerance", "Dry skin", "Constipation", "Depression", "Memory problems", "Hair loss"],
    relatedTerms: ["Hashimoto's disease", "Thyroiditis", "Goiter", "Myxedema", "Cretinism"]
  },
  {
    id: 12,
    term: "Epilepsy",
    definition: "A neurological disorder marked by sudden recurrent episodes of sensory disturbance, loss of consciousness, or convulsions, associated with abnormal electrical activity in the brain.",
    pronunciation: "/ˈɛpɪlɛpsi/",
    type: "Condition",
    symptoms: ["Seizures", "Temporary confusion", "Staring spells", "Uncontrollable jerking movements", "Loss of consciousness", "Psychic symptoms (fear, anxiety, déjà vu)"],
    relatedTerms: ["Seizure disorder", "Convulsions", "Status epilepticus", "Petit mal", "Grand mal"]
  }
];

export class MemStorage implements IStorage {
  private medicalTerms: Map<number, MedicalTerm>;
  private searchHistory: Map<number, SearchHistory>;
  currentTermId: number;
  currentSearchId: number;

  constructor() {
    this.medicalTerms = new Map();
    this.searchHistory = new Map();
    this.currentTermId = sampleMedicalTerms.length + 1;
    this.currentSearchId = 1;

    // Initialize with sample data
    sampleMedicalTerms.forEach(term => {
      this.medicalTerms.set(term.id, term);
    });
  }

  async getMedicalTerm(id: number): Promise<MedicalTerm | undefined> {
    return this.medicalTerms.get(id);
  }

  async getMedicalTermByName(term: string): Promise<MedicalTerm | undefined> {
    const normalizedSearchTerm = term.toLowerCase().trim();
    
    return Array.from(this.medicalTerms.values()).find(
      (medicalTerm) => medicalTerm.term.toLowerCase() === normalizedSearchTerm
    );
  }

  async searchMedicalTerms(searchTerm: string): Promise<MedicalTerm[]> {
    if (!searchTerm.trim()) return [];
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return Array.from(this.medicalTerms.values()).filter(
      (medicalTerm) => 
        medicalTerm.term.toLowerCase().includes(normalizedSearchTerm) ||
        medicalTerm.definition.toLowerCase().includes(normalizedSearchTerm) ||
        (medicalTerm.relatedTerms && medicalTerm.relatedTerms.some(related => 
          related.toLowerCase().includes(normalizedSearchTerm)
        ))
    );
  }

  async getSuggestions(partial: string, limit: number = 5): Promise<string[]> {
    if (!partial.trim() || partial.length < 2) return [];
    
    const normalizedPartial = partial.toLowerCase().trim();
    
    const matchingTerms = Array.from(this.medicalTerms.values())
      .filter(term => term.term.toLowerCase().includes(normalizedPartial))
      .map(term => term.term)
      .slice(0, limit);
    
    return matchingTerms;
  }

  async insertMedicalTerm(termData: InsertMedicalTerm): Promise<MedicalTerm> {
    const id = this.currentTermId++;
    
    // Explicitly type each property to ensure null for optional fields
    const newTerm: MedicalTerm = {
      id,
      term: termData.term,
      definition: termData.definition,
      pronunciation: termData.pronunciation || null,
      type: termData.type || null,
      symptoms: termData.symptoms || null,
      relatedTerms: termData.relatedTerms || null
    };
    
    this.medicalTerms.set(id, newTerm);
    return newTerm;
  }

  async recordSearch(searchData: InsertSearchHistory): Promise<SearchHistory> {
    const id = this.currentSearchId++;
    
    // Explicitly type each property to ensure null for optional fields
    const searchRecord: SearchHistory = {
      id,
      searchTerm: searchData.searchTerm,
      timestamp: searchData.timestamp,
      resultCount: searchData.resultCount,
      ipAddress: searchData.ipAddress || null
    };
    
    this.searchHistory.set(id, searchRecord);
    return searchRecord;
  }

  async getRandomTerm(): Promise<MedicalTerm | undefined> {
    const terms = Array.from(this.medicalTerms.values());
    
    if (terms.length === 0) {
      return undefined;
    }
    
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * terms.length);
    
    return terms[randomIndex];
  }
}

export const storage = new MemStorage();
