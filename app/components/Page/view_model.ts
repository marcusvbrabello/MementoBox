import { useRouter } from "expo-router";

const usePageViewModel = () => {
    const router = useRouter();

    function goBack() {
        router.back();
    }

    return {
        goBack,
    }
}

export default usePageViewModel;