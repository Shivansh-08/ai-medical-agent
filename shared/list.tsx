export const AIDoctorAgents = [
    {
        id: 1,
        specialist: "General Physician",
        description: "Helps with everyday health concerns and common symptoms.",
        image: "/doctor1.png",
        agentPrompt: "You are a friendly General Physician AI. Greet the user and quickly ask what symptoms they're experiencing. Keep responses short and helpful.",
        voiceId: "Will", // ✅ Correct case
        subscriptionRequired: false
    },
    {
        id: 2,
        specialist: "Pediatrician",
        description: "Expert in children's health, from babies to teens.",
        image: "/doctor2.png",
        agentPrompt: "You are a kind Pediatrician AI. Ask brief questions about the child's health and share quick, safe suggestions.",
        voiceId: "s3://voice-cloning-zero-shot/028a32d4-6a79-4ca3-a303-d6559843114b/chris/manifest.json", // ✅ Correct case
        subscriptionRequired: true
    },
    {
        id: 3,
        specialist: "Dermatologist",
        description: "Handles skin issues like rashes, acne, or infections.",
        image: "/doctor3.png",
        agentPrompt: "You are a knowledgeable Dermatologist AI. Ask short questions about the skin issue and give simple, clear advice.",
        voiceId: "s3://voice-cloning-zero-shot/3a637c59-4f22-4ad1-bf73-f657dfbb1978/harrissaad/manifest.json", // ✅ Changed from "sarge" to valid voice
        subscriptionRequired: true
    },
    {
        id: 4,
        specialist: "Psychologist",
        description: "Supports mental health and emotional well-being.",
        image: "/doctor4.png",
        agentPrompt: "You are a caring Psychologist AI. Ask how the user is feeling emotionally and give short, supportive tips.",
        voiceId: "s3://mockingbird-prod/susan_vo_training_46ffcc60-d630-42f6-acfe-4affd003ae7a/voices/speaker/manifest.json", // ✅ Correct case
        subscriptionRequired: true
    },
    {
        id: 5,
        specialist: "Nutritionist",
        description: "Provides advice on healthy eating and weight management.",
        image: "/doctor5.png",
        agentPrompt: "You are a motivating Nutritionist AI. Ask about current diet or goals and suggest quick, healthy tips.",
        voiceId: "s3://voice-cloning-zero-shot/b709b944-9256-4578-b9d8-a1ce4d729022/eileensaad/manifest.json", // ✅ Correct case
        subscriptionRequired: true
    },
    {
        id: 6,
        specialist: "Cardiologist",
        description: "Focuses on heart health and blood pressure issues.",
        image: "/doctor6.png",
        agentPrompt: "You are a calm Cardiologist AI. Ask about heart symptoms and offer brief, helpful advice.",
        voiceId: "s3://peregrine-voices/charlotte meditation 2 parrot saad/manifest.json", // ✅ Correct case
        subscriptionRequired: true
    },
    {
        id: 7,
        specialist: "ENT Specialist",
        description: "Handles ear, nose, and throat-related problems.",
        image: "/doctor7.png",
        agentPrompt: "You are a friendly ENT AI. Ask quickly about ENT symptoms and give simple, clear suggestions.",
        voiceId: "s3://voice-cloning-zero-shot/d712cad5-85db-44c6-8ee0-8f4361ed537b/eleanorsaad2/manifest.json", // ✅ Correct case
        subscriptionRequired: true
    },
    {
        id: 8,
        specialist: "Orthopedic",
        description: "Provides expert care for arthritis, injuries, and strains.",
        image: "/doctor8.png",
        agentPrompt: "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
        voiceId: "s3://voice-cloning-zero-shot/f6c4ed76-1b55-4cd9-8896-31f7535f6cdb/original/manifest.json", // ✅ Already correct
        subscriptionRequired: true
    },
    {
        id: 9,
        specialist: "Gynecologist",
        description: "Cares for women's reproductive and hormonal health.",
        image: "/doctor9.png",
        agentPrompt: "You are a respectful Gynecologist AI. Ask brief questions and keep answers short and reassuring.",
        voiceId: "s3://peregrine-voices/hudson saad parrot/manifest.json", // ✅ Correct case
        subscriptionRequired: true
    },
    {
        id: 10,
        specialist: "Dentist",
        description: "Handles oral hygiene and dental problems.",
        image: "/doctor10.png",
        agentPrompt: "You are a cheerful Dentist AI. Ask about the dental issue and give quick, calming suggestions.",
        voiceId: "s3://voice-cloning-zero-shot/2879ab87-3775-4992-a228-7e4f551658c2/fredericksaad2/manifest.json", // ✅ Correct case
        subscriptionRequired: true
    }
];