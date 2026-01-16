import React, { createContext, useContext, useState } from 'react';

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
    const [caseData, setCaseData] = useState({
        description: '',
        timeline: [],
        actors: [],
        questions: [],
        evidenceScore: 0,
        currentStep: 'home', // home, input, sim, result, legal, forum
        structuredEvidence: {
            context: '',
            location: '',
            time: '',
            witnesses: '',
            evidence_files: ''
        }
    });

    const updateCase = (newData) => {
        setCaseData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = (step) => {
        setCaseData(prev => ({ ...prev, currentStep: step }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <CaseContext.Provider value={{ caseData, updateCase, nextStep }}>
            {children}
        </CaseContext.Provider>
    );
};

export const useCase = () => useContext(CaseContext);
