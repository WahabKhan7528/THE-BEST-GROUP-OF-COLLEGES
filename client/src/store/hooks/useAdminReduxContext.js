import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampus as addCampusAction,
  deleteCampus as deleteCampusAction,
  setSelectedCampusFilter as setSelectedCampusFilterAction,
  updateCampus as updateCampusAction,
} from "../slices/adminSlice";
import { toggleDarkMode as toggleDarkModeAction } from "../slices/uiSlice";

export const useAdminContext = () => {
  const dispatch = useDispatch();
  const { campuses: rawCampuses, selectedCampusFilter } = useSelector((state) => state.admin);
  const currentAdmin = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  const isSuperAdmin = currentAdmin?.role === "super_admin";

  const campuses = useMemo(
    () =>
      (rawCampuses || []).map((campus) => ({
        ...campus,
        id: campus._id,
      })),
    [rawCampuses],
  );

  const getSubAdminCampus = () => {
    if (isSuperAdmin) return null;
    return currentAdmin?.campus?._id || currentAdmin?.campus || null;
  };

  const getVisibleCampuses = () => {
    if (isSuperAdmin) return campuses;
    const currentCampusId = getSubAdminCampus();
    return campuses.filter((campus) => campus.id === currentCampusId);
  };

  const getCurrentCampusContext = () => {
    if (selectedCampusFilter === "all") return null;
    return campuses.find((campus) => campus.id === selectedCampusFilter) || null;
  };

  const getAdminAllocations = () => {
    const campusId = getSubAdminCampus();
    return campusId ? [campusId] : [];
  };

  const updateAdminAllocations = () => {};

  const setSelectedCampusFilter = (value) => {
    dispatch(setSelectedCampusFilterAction(value));
  };

  const addCampus = (newCampus) => {
    dispatch(
      addCampusAction({
        ...newCampus,
        _id: newCampus?._id || newCampus?.id || Date.now().toString(),
      }),
    );
  };

  const updateCampus = (campusId, updatedCampus) => {
    dispatch(updateCampusAction({ ...(updatedCampus || {}), _id: campusId }));
  };

  const deleteCampus = (campusId) => {
    dispatch(deleteCampusAction(campusId));
  };

  const switchAdminUser = () => {};

  const toggleDarkMode = () => {
    dispatch(toggleDarkModeAction());
  };

  return {
    currentAdmin,
    selectedCampusFilter,
    campuses,
    adminCampusAllocations: {},
    isDarkMode,
    isSuperAdmin,
    setSelectedCampusFilter,
    getVisibleCampuses,
    getCurrentCampusContext,
    getAdminAllocations,
    getSubAdminCampus,
    updateAdminAllocations,
    addCampus,
    updateCampus,
    deleteCampus,
    switchAdminUser,
    toggleDarkMode,
  };
};
