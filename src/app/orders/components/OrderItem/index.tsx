import { useFormContext } from "react-hook-form";
import { Box, Flex, Text, IconButton, VStack } from "@chakra-ui/react";
import { Trash } from "lucide-react";

import type { Pneu, Servico } from "@/lib/api-client";
import { CreatePneuDtoTypeEnum } from "@/lib/api-client";
import { DataField } from "@/components/DataField";
import { OrderForm } from "../../schema";
import { useOrderItemTiresFilters } from "../../hooks/useOrderItemPneuFilters";

interface Props {
  index: number;
  remove: (index: number) => void;
  pneus?: Pneu[];
  servicos?: Servico[];
}

export function OrderItem({ index, remove, pneus, servicos }: Props) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<OrderForm>();

  const {
    tipo,
    hasWarranty,
    aroFilter,
    availableRims,
    availableSizes,
  } = useOrderItemTiresFilters({ index, pneus, control, setValue });

  return (
    <Box p={4} borderWidth={1} borderRadius="xl">
      <Flex justify="space-between">
        <Text fontWeight="bold">Item {index + 1}</Text>
        {index > 0 && (
          <IconButton
            aria-label="remove"
            size="xs"
            colorScheme="red"
            icon={<Trash size={16} />}
            onClick={() => remove(index)}
          />
        )}
      </Flex>

      <VStack spacing={4} mt={4}>
        <DataField
          label="Categoria"
          type="select"
          register={register(`itens.${index}.tipo`)}
        >
          <option value="PNEU">Pneu</option>
          <option value="SERVICO">Serviço</option>
        </DataField>

        {tipo === "PNEU" ? (
          <VStack w="full" align="start">
            <DataField
              label="Tipo do Pneu"
              type="select"
              placeholder="Selecione o tipo..."
              register={register(`itens.${index}.tipoPneuFilter`)}
            >
              {Object.values(CreatePneuDtoTypeEnum).map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </DataField>

            <Flex gap={4} w="full">
              <DataField
                label="Aro"
                type="select"
                placeholder="Selecione..."
                register={register(`itens.${index}.aroFilter`)}
              >
                {availableRims.map((rim) => (
                  <option key={rim} value={rim}>
                    {rim}
                  </option>
                ))}
              </DataField>

              <DataField
                label="Numeração"
                type="select"
                placeholder="Selecione..."
                isDisabled={!aroFilter}
                register={register(`itens.${index}.numeracaoFilter`)}
              >
                {availableSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </DataField>
            </Flex>
            {errors.itens?.[index]?.itemId && (
              <Text color="red.500" fontSize="sm">
                {errors.itens[index]?.itemId?.message}
              </Text>
            )}
          </VStack>
        ) : (
          <DataField
            label="Serviço"
            type="select"
            register={register(`itens.${index}.itemId`)}
            error={errors.itens?.[index]?.itemId}
          >
            <option value="">Selecione...</option>
            {servicos?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </DataField>
        )}

        <DataField
          label="Preço"
          type="number"
          register={register(`itens.${index}.precoUnitario`)}
        />

        {tipo === "PNEU" && (
          <>
            <DataField
              label="Quantidade"
              type="number"
              register={register(`itens.${index}.quantidade`)}
            />

            <DataField
              type="checkbox"
              label="Garantia"
              register={register(`itens.${index}.garantia.hasWarranty`)}
            />

            {hasWarranty && (
              <VStack
                pl={4}
                borderLeftWidth={2}
                borderColor="green.500"
                spacing={3}
              >
                <DataField
                  label="Placa"
                  register={register(`itens.${index}.garantia.placa`)}
                />
                <DataField
                  label="Quilometragem"
                  type="number"
                  register={register(`itens.${index}.garantia.quilometragem`)}
                />
                <DataField
                  label="Condição"
                  type="textarea"
                  register={register(`itens.${index}.garantia.condicao`)}
                />
              </VStack>
            )}
          </>
        )}
      </VStack>
    </Box>
  );
}
