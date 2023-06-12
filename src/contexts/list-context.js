import React, { createContext, useEffect, useState } from "react";
import drawerTypes from "@/components/Drawers/drawerTypes";
import fetcher from "@/services/fetcher";
import ListDeleteItemModal from "@/components/List/ListDeleteItemModal";
import { sortbyOptions } from "@/components/SortBy";

const ListContext = createContext({
  searchVal: "",
  onChangeSearch: () => {},
  openCreateModal: () => {},
  isLoading: false,
  page: 1,
  setPage: () => {},
  handleDelete: () => {},
  openEditModal: () => {},
  refresh: () => {},
  listItems: {},
  sortBy: sortbyOptions[0].value,
  setSortBy: () => {},
  handleSelect: (isChecked = true, itemData = {}) =>
    console.log(isChecked, itemData),
  handleSaveSelected: () => {},
  isSelected: (itemData = {}) => console.log(itemData),
  selectedItems: [],
  lastFilters: {},
});

export const ListProvider = ({
  children,
  formId = "",
  endpoint = "",
  onSaveSelected,
  itemsQuantity = 10,
}) => {
  const [searchVal, setSearchVal] = useState();
  const [isCreateModalOpen, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editModalData, setOpenEditModal] = useState(false);
  const [listItems, setListItems] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFilters, setLastFilters] = useState();
  const [sortBy, setSortBy] = useState(sortbyOptions[0].value);

  const [selectedItems, setSelectedItems] = useState([]);

  const getData = async (urlParams, noSave = false) => {
    setIsLoading(true);
    if (urlParams && !noSave) {
      setLastFilters(urlParams);
    }

    await fetcher({
      url: `${endpoint}/list`,
      params: {
        page,
        sortBy,
        limit: itemsQuantity,
        ...(urlParams ? urlParams : lastFilters ? lastFilters : {}),
      },
    }).then((res) => res.data && setListItems(res.data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (endpoint) getData();
  }, [endpoint, page]);

  const handleSortBy = (id) => {
    setSortBy(id);
    getData({ sortBy: id, ...(lastFilters ? lastFilters : {}) }, true);
  };

  const deleteItem = () =>
    fetcher({
      url: `${endpoint}/delete/${openDeleteModal.id}`,
      method: "DELETE",
    }).then(() => {
      setOpenDeleteModal(null);
      getData();
    });

  const handleDelete = (itemData) => () => {
    setOpenDeleteModal(itemData);
  };

  const onChangeSearch = ({ target: { value } }) => setSearchVal(value);

  const openCreateModal = () => setOpenCreateModal((prev) => !prev);

  const openEditModal = (itemData) => () => setOpenEditModal(itemData);

  const handleSelect = (isChecked, selectedItem) =>
    setSelectedItems((prev) => {
      if (isChecked) return [...prev, selectedItem];
      return prev.filter((item) => item?.id !== selectedItem?.id);
    });

  const cleanSelected = () => setSelectedItems([]);

  const handleSaveSelected = () => {
    onSaveSelected(selectedItems, {
      cleanSelected,
    });
  };

  const isSelected = (itemData) =>
    selectedItems.some((item) => item?.id === itemData?.id);

  const Drawer = drawerTypes[formId];

  return (
    <ListContext.Provider
      value={{
        onChangeSearch,
        searchVal,
        openCreateModal,
        openEditModal,
        isLoading,
        page,
        setPage,
        listItems,
        handleDelete,
        refresh: endpoint ? getData : () => {},
        handleSortBy,
        handleSelect,
        selectedItems,
        isSelected,
        handleSaveSelected: onSaveSelected ? handleSaveSelected : undefined,
        lastFilters
      }}
    >
      {children}
      {Drawer && isCreateModalOpen && (
        <Drawer isOpen toggle={openCreateModal} isCreating refresh={getData} />
      )}
      {Drawer && editModalData && (
        <Drawer
          isOpen
          toggle={openEditModal()}
          refresh={getData}
          data={editModalData}
        />
      )}
      <ListDeleteItemModal
        isOpen={!!openDeleteModal}
        toggle={() => setOpenDeleteModal(null)}
        title={openDeleteModal?.name}
        submit={deleteItem}
      />
    </ListContext.Provider>
  );
};

export default ListContext;
