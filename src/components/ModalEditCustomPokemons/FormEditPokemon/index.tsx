import React, { useContext, useEffect, useState } from 'react';

import InputText from 'components/InputText';
import { SelectType } from 'components/Select';
import InputNumber from 'components/InputNumber';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PokedexContext } from 'context/pokedexContext';

import * as S from './styles'
import * as ModalForm from '../styles'
import Button from 'components/Button';
import { formSchema } from 'app/validations';
import { HorizontalLine } from 'components/HorizontalLine';
import toast from 'react-hot-toast';
import { useUI } from 'hooks/useUI';
import { PokemonProps } from 'dtos/pokemon';


export type UploadImageInfo = {
  uploadImageInfo: string[]; 
}

export function FormEditPokemon({ uploadImageInfo }: UploadImageInfo) {
  const [selectedTypes, setSelectedTypes] = useState<any>([])
  const { pokedex, handleEditCustomPokemon } = useContext(PokedexContext);
  const { closeModal } = useUI();
  

  const selectedEditData =  pokedex.find((pokemon: PokemonProps) => pokemon.isSelected)
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      hp: selectedEditData?.hp ?? 0,
      name: selectedEditData?.name ?? '',
      height: selectedEditData?.height ?? 0,
      weight: selectedEditData?.weight ?? 0,
      types: selectedEditData?.types ?? [],
      image:selectedEditData?.image ??  '',
      ability1: selectedEditData?.ability1 ?? '',
      ability2: selectedEditData?.ability2 ?? '',
      ability3: selectedEditData?.ability3 ?? '',
      ability4: selectedEditData?.ability4 ?? '',
      defense: selectedEditData?.defense ??0,
      attack: selectedEditData?.attack ?? 0,
      specialDefense:   selectedEditData?.specialDefense ?? 0,
      specialAttack:  selectedEditData?.specialAttack ?? 0,
    }
  });

  function handleSelectType(type: any) {
    setSelectedTypes([{
      name: type.name,
      id: type.id,
      value: type.value,
    }]);
    setSelectedTypes(type)
  }

  function editCustomPokemon(data: any){
    const newData = {
      ...selectedEditData,
      ...data,
      types: selectedTypes,
      image: uploadImageInfo
    }

    handleEditCustomPokemon(newData)
    closeModal()
    toast.success("Pokemon editado com sucesso!", {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#157100',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    })
  }

  const increaseHp = () => {
    const quantity = watch("hp");
    setValue("hp", quantity + 1)
  };

  const decreaseHp = () => {
    const quantity = watch("hp");
    if (quantity > 1) {
      setValue("hp", quantity - 1);
    }
  };

  const increaseWeight = () => {
    const quantity = watch("weight");
    setValue("weight", quantity + 1);
  }
  const decreaseWeight = () => {
    const quantity = watch("weight");
    if (quantity > 1) {
      setValue("weight", quantity - 1);
    }
  };

  const increaseHeight = () => {
    const quantity = watch("height");
    setValue("height", quantity + 1);
  }
  const decreaseHeight = () => {
    const quantity = watch("height");
    if (quantity > 1) {
      setValue("height", quantity - 1);
    }
  };

  const increaseAttack = () => {
    const quantity = watch("attack");
    setValue("attack", quantity + 1);
  }
  const decreaseAttack = () => {
    const quantity = watch("attack");
    if (quantity > 1) {
      setValue("attack", quantity - 1);
    }
  };

  const increaseDefense = () => {
    const quantity = watch("defense");
    setValue("defense", quantity + 1);
  }
  const decreaseDefense = () => {
    const quantity = watch("defense");
    if (quantity > 1) {
      setValue("defense", quantity - 1);
    }
  };

  const increaseSpecialDefense = () => {
    const quantity = watch("specialDefense");
    setValue("specialDefense", quantity + 1);
  }

  const decreaseSpecialDefense = () => {
    const quantity = watch("specialDefense");
    if (quantity > 1) {
      setValue("specialDefense", quantity - 1);
    }
  };

  const increaseSpecialAttack = () => {
    const quantity = watch("specialAttack");
    setValue("specialAttack", quantity + 1);
  }

  const decreaseSpecialAttack = () => {
    const quantity = watch("specialAttack");
    if (quantity > 1) {
      setValue("specialAttack", quantity - 1);
    }
  };


  return (
    <S.FormContainer >
      <form onSubmit={handleSubmit(editCustomPokemon)} >
        <InputText
           label="Nome"
           type="text"
           placeholder="name"
           {...register("name")}
           error={errors.name}
          />
          <InputNumber
              label="HP"
              type="number"
              readOnly
              {...register('hp')}
              handleIncrease={increaseHp}
              handleDecrease={decreaseHp}
              error={errors.hp}
          />
          <InputNumber
              label="Peso"
              {...register('weight')}
              suffix={"Kg"}
              readOnly
              handleIncrease={increaseWeight}
              handleDecrease={decreaseWeight}
              error={errors.weight}
          />
          <InputNumber
              label="ALTURA"
              type="number"
              //  name="hp"
              readOnly
              suffix={"Cm"}
              placeholder="Altura"
              handleIncrease={increaseHeight}
              handleDecrease={decreaseHeight}
              error={errors.height}
              {...register('height')}
            />
           <HorizontalLine  title={'Tipo'}/>
          <SelectType
            handleSelectType={handleSelectType}
            selectedValues={selectedEditData?.types}
            {...register('types')}
            error={errors.types}
          />
           <HorizontalLine  title={'HABILIDADES'}/>
            <InputText
              label=""
              type="text"
              placeholder="Habilidade 1"
              {...register("ability1")}
              error={errors.ability1}
            />
            <InputText
              label=""
              type="text"
              placeholder="Habilidade 2"
              {...register("ability2")}
              error={errors.ability2}
            />
            <InputText
              label=""
              type="text"
              placeholder="Habilidade 3"
              {...register("ability3")}
              error={errors.ability3}
            />
            <InputText
              label=""
              type="text"
              placeholder="Habilidade 4"
              {...register("ability4")}
              error={errors.ability4}
            />
          <ModalForm.HorizontalLine>
            <HorizontalLine  title={'ESTATÍSTICAS'}/>
          </ModalForm.HorizontalLine>
          <InputNumber
            label="DEFESA"
            type="number"
            icon=""
            readOnly
            suffix={""}
            placeholder="00"
            handleIncrease={increaseDefense}
            handleDecrease={decreaseDefense}
            error={errors.defense}
            {...register('defense')}
          />
          <InputNumber
            label="ATAQUE"
            type="number"
            readOnly
            suffix={""}
            placeholder="00"
            handleIncrease={increaseAttack}
            handleDecrease={decreaseAttack}
            error={errors.attack}
            {...register('attack')}
          />
           <InputNumber
            label="SPECIAL-DEFENSE"
            type="number"
            suffix={""}
            placeholder="00"
            readOnly
            handleIncrease={increaseSpecialDefense}
            handleDecrease={decreaseSpecialDefense}
            error={errors.specialDefense}
            {...register('specialDefense')}
          />
          <InputNumber
            label="ATAQUE ESPECIAL"
            type="number"
            suffix={""}
            placeholder="00"
            readOnly
            handleIncrease={increaseSpecialAttack}
            handleDecrease={decreaseSpecialAttack}
            error={errors.specialAttack}
            {...register('specialAttack')}
          />
           <Button
              text="EDITAR POKEMON"
              icon=""
              onlyIcon=""
            />
      </form>
    </S.FormContainer>
  );
}


