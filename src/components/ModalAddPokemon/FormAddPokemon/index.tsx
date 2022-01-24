import React from 'react';
import { useForm } from 'react-hook-form';

export function FormAddPokemon({ onSubmit, onHandleAddCustomPokemon, requestCloseModal }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="name" {...register("name", {required: true, maxLength: 80})} />
      <input type="number" placeholder="height" {...register("height", {required: true, max: 100})} />
      <input type="number" placeholder="weight" {...register("weight", {required: true, max: 10000})} />
      <select title="type" {...register("type", { required: true })}>
          <option>
            Fire
          </option>
            <option>
            Water
            </option>
      </select>
      <input type="text" placeholder="ability" {...register("ability", {required: true})} />
      <input type="number" placeholder="defeat" {...register("defeat", {required: true, max: 200, min: 0})} />

      {/* <input type="submit" /> */}
      <button type="submit" >
        CRIAR POKEMON
      </button>
    </form>
  );
}