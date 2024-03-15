
const getPredictedGender = async (name: string) => {
    const res = await fetch(`https://api.genderize.io?name=${name}`);
    return res.json();
};

const getPredictedNationality = async (name: string) => {
    const res = await fetch(`https://api.nationalize.io?name=${name}`);
    return res.json();
};

interface Params {
    params: { name: string };
}

async function Prediction({ params }: Params) {
    const genderData = getPredictedGender(params.name);
    const nationalityData = getPredictedNationality(params.name);
    const [gender, nationality] = await Promise.all([
        genderData,
        nationalityData,
    ]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md mx-auto bg-white  overflow-hidden md:max-w-2xl m-3 p-4">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Prediction Info
                    </div>
                    <div className="block mt-1 text-lg leading-tight font-medium text-black">
                        Gender: {gender?.gender}
                    </div>
                    <div className="block mt-1 text-lg leading-tight font-medium text-black">
                        Nationality: {nationality?.country[0]?.country_id}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prediction;