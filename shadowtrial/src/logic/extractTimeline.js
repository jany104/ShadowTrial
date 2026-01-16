/**
 * Simple rule-based extraction for the simulation.
 * In a real app, this might use NLP or a LLM.
 */
export const extractTimeline = (text) => {
    const events = [];
    const dateRegex = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2}\/\d{1,2}|\d{4})/gi;

    const sentences = text.split(/[.!?]+/);
    sentences.forEach(sentence => {
        const matches = sentence.match(dateRegex);
        if (matches) {
            events.push({
                time: matches[0],
                activity: sentence.trim()
            });
        }
    });

    return events.length > 0 ? events : [{ time: "Unknown Date", activity: "Incident narrated without specific temporal markers." }];
};

export const extractActors = (text) => {
    const commonTitles = ["Manager", "Colleague", "Supervisor", "Director", "CEO", "HR"];
    const found = [];

    commonTitles.forEach(title => {
        if (text.toLowerCase().includes(title.toLowerCase())) {
            found.push(title);
        }
    });

    return found.length > 0 ? found : ["Unspecified individual(s)"];
};
