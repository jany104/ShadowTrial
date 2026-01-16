import React from 'react'
import { CaseProvider, useCase } from './context/CaseContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import IncidentInput from './pages/IncidentInput'
import QuestionSim from './pages/QuestionSim'
import EvidenceResult from './pages/EvidenceResult'
import LegalFlow from './pages/LegalFlow'


const AppContent = () => {
    const { caseData, nextStep } = useCase()

    const renderPage = () => {
        switch (caseData.currentStep) {
            case 'home': return <Home />
            case 'input': return <IncidentInput />
            case 'sim': return <QuestionSim />
            case 'result': return <EvidenceResult />
            case 'legal': return <LegalFlow />
            default: return <Home />
        }
    }

    return (
        <div className="app-container">
            <Navbar />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    )
}

function App() {
    return (
        <CaseProvider>
            <AppContent />
        </CaseProvider>
    )
}

export default App
