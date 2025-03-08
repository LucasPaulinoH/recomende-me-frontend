import { useRef, useState } from "react";
import { LoggedContainer } from "../../styles/shared";
import { FIREBASE_AUTH } from "../../utils/firebaseConfig";
import useSelectedType from "@/hooks/useSelectedType";
import { showTypeLabel } from "@/utils/stringUtils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PsychologicalConcept } from "@/types/PsychologicalConcept";
import { handleAddRecommendation } from "./functions";
import { NewRecommendationDTO } from "@/services/Recommendation/Recommendation";
import { useNavigate } from "react-router-dom";
import useSearchRecommendationMedia from "@/hooks/useSearchRecommendationMedia";
import Autocomplete from "@/components/Autocomplete";
import { Book, Clapperboard, Music, Plus } from "lucide-react";
import Media from "@/types/SelectedMedia";
import { RecommendationType } from "@/types/RecommendationType";
import {
  BOOK_ICON_COLOR,
  MOVIE_ICON_COLOR,
  SONG_ICON_COLOR,
} from "@/components/RecommendationTypeCard/styles";
import addRecommendationSchema from "@/validation/addRecommendationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Form } from "@/components/ui/form";

const AddRecommendation = () => {
  const navigate = useNavigate();

  const { currentUser } = FIREBASE_AUTH;
  const { selectedType } = useSelectedType();

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const [search, setSearch] = useState("");

  const { results } = useSearchRecommendationMedia(selectedType, search);

  const psychologicalImpactRef = useRef<HTMLTextAreaElement>(null);

  const [addLoading, setAddLoading] = useState(false);

  const handleAddRecommendationClick = async () => {
    setAddLoading(true);

    if (!selectedMedia) {
      alert(`É necessário selecionar ${showTypeLabel(selectedType)}`);
      return;
    }

    handleAddRecommendation({
      title: selectedMedia?.title,
      type: selectedType,
      psychologicalConcept: psychologicalConcept,
      psychologicalImpact: psychologicalImpactRef?.current?.value,
      userId: currentUser?.uid,
      username: currentUser?.displayName,
      authors: selectedMedia?.authors,
      cover: selectedMedia?.cover,
    } as NewRecommendationDTO)
      .then(() => navigate(`/recommendations/my`))
      .finally(() => setAddLoading(false));
  };

  const addRecommendationForm = useForm<
    z.infer<typeof addRecommendationSchema>
  >({
    resolver: zodResolver(addRecommendationSchema),
    defaultValues: {
      psychologicalImpact: "",
      psychologicalConcept: undefined,
    },
  });

  const psychologicalConcept = addRecommendationForm.watch(
    "psychologicalConcept"
  );

  return (
    <LoggedContainer>
      <Form {...addRecommendationForm}>
        <form
          className="w-full flex flex-col items-center justify-center max-w-[400px]"
          onSubmit={addRecommendationForm.handleSubmit(
            handleAddRecommendationClick
          )}
        >
          <div className="flex items-center gap-2">
            {selectedType === RecommendationType.BOOK ? (
              <Book color={BOOK_ICON_COLOR} />
            ) : selectedType === RecommendationType.MOVIE ? (
              <Clapperboard color={MOVIE_ICON_COLOR} />
            ) : (
              <Music color={SONG_ICON_COLOR} />
            )}
            <h1 className="font-bold">{`Nova recomendação de ${showTypeLabel(
              selectedType
            ).toLowerCase()}`}</h1>
          </div>
          <div className="max-w-[400px] w-full flex flex-col gap-5 p-10">
            <Autocomplete
              search={search}
              setSearch={setSearch}
              results={results}
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
            />

            <FormInput
              control={addRecommendationForm.control}
              name="psychologicalConcept"
              label="Conceito psicológico *"
            >
              {(field) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Conceito psicológico *" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PsychologicalConcept).map(
                      ([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            </FormInput>

            <FormInput
              control={addRecommendationForm.control}
              name="psychologicalImpact"
              label="Impacto psicológico *"
            >
              {(field) => <Textarea {...field} ref={psychologicalImpactRef} />}
            </FormInput>

            <Button
              className="cursor-pointer"
              type="submit"
              disabled={addLoading}
            >
              {!addLoading ? (
                <>
                  <Plus />
                  Adicionar recomendação
                </>
              ) : (
                "Adicionando recomendação..."
              )}
            </Button>
          </div>
        </form>
      </Form>
    </LoggedContainer>
  );
};

export default AddRecommendation;
