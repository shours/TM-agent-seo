import React from 'react';
import { useForm } from 'react-hook-form';
import { AnalysisFormData } from '../types/analysis';

interface AnalysisFormProps {
  onSubmit: (data: AnalysisFormData) => Promise<void>;
  isLoading: boolean;
}

const AnalysisForm = ({ onSubmit, isLoading }: AnalysisFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AnalysisFormData>({
    defaultValues: {
      keyword: '',
      language: 'en',
      searchEngine: 'en-us',
      audience: '',
      clientInfo: '',
      serpamicsId: '',
      projectName: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mot clef principal
        </label>
        <input
          {...register('keyword', { required: 'Le mot clef est requis' })}
          type="text"
          placeholder="Ex: 3 days in Rome"
          className="mt-1 block w-full h-14 px-4 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
          disabled={isLoading}
        />
        {errors.keyword && (
          <p className="mt-1 text-sm text-red-600">{errors.keyword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom de projet
        </label>
        <input
          {...register('projectName', { required: 'Le nom de projet est requis' })}
          type="text"
          placeholder="Entrez le nom du projet"
          className="mt-1 block w-full h-14 px-4 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
          disabled={isLoading}
        />
        {errors.projectName && (
          <p className="mt-1 text-sm text-red-600">{errors.projectName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ID Serpmantics
        </label>
        <textarea
          {...register('serpamicsId')}
          placeholder="coller l'ID serpmantics"
          className="mt-1 block w-full h-32 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Audience
        </label>
        <textarea
          {...register('audience')}
          placeholder="Décrivez l'audience cible..."
          className="mt-1 block w-full h-32 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Informations sur le client
        </label>
        <textarea
          {...register('clientInfo')}
          placeholder="Ajoutez des informations sur le client..."
          className="mt-1 block w-full h-32 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Langue
        </label>
        <select
          {...register('language')}
          className="mt-1 block w-full h-14 px-4 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
          disabled={isLoading}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Moteur de recherche
        </label>
        <select
          {...register('searchEngine')}
          className="mt-1 block w-full h-14 px-4 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
          disabled={isLoading}
        >
          <option value="en-us">en-us</option>
          <option value="fr">fr</option>
          <option value="en-gb">en-gb</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full h-14 flex justify-center items-center border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
          isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {isLoading ? (
          "Analyse en cours..."
        ) : (
          "Lancer le brief de rédaction"
        )}
      </button>
    </form>
  );
};

export default AnalysisForm;