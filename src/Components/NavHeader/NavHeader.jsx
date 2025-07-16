import { Link } from "react-router-dom";
import {
  useFloating,
  useHover,
  useInteractions,
  useDismiss,
  offset,
  flip,
  shift,
  safePolygon,
  arrow,
} from "@floating-ui/react";
import { useContext, useRef, useState } from "react";
import { motion, AnimatePresence, scale } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { AppContext } from "../../context/app.context";
import { logoutAccount } from "../../apis/auth.api";

export default function NavHeader() {
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const languageArrowRef = useRef(null);
  const {
    refs: langRefs,
    floatingStyles: langStyles,
    middlewareData: langMiddleware,
    context: context1,
    placement: languagePlacement,
  } = useFloating({
    open: openLanguage,
    onOpenChange: setOpenLanguage,
    middleware: [
      offset(3),
      flip(),
      shift(),
      arrow({ element: languageArrowRef }),
    ],
    placement: "bottom-end",
  });

  //language
  const hoverLang = useHover(context1, {
    handleClose: safePolygon({ restMs: 25 }),
    move: false,
    delay: { open: 50, close: 150 },
  });

  const dismissLang = useDismiss(context1);

  const {
    getReferenceProps: getLangRefProps,
    getFloatingProps: getLangFloatingProps,
  } = useInteractions([hoverLang, dismissLang]);
  //user
  const userArrowRef = useRef(null);
  const {
    refs: userRefs,
    floatingStyles: userStyles,
    middlewareData: userMiddleware,
    context: context2,
    placement: userPlacement,
  } = useFloating({
    open: openUser,
    onOpenChange: setOpenUser,
    middleware: [offset(3), flip(), shift(), arrow({ element: userArrowRef })],
    placement: "bottom",
  });
  const hoverUser = useHover(context2, {
    handleClose: safePolygon({ restMs: 25 }),
    move: false,
    delay: { open: 50, close: 150 },
  });

  const dismissUser = useDismiss(context2);
  const {
    getReferenceProps: getUserRefProps,
    getFloatingProps: getUserFloatingProps,
  } = useInteractions([hoverUser, dismissUser]);
  //logout
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } =
    useContext(AppContext);
  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false);
      setProfile(null);
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <>
      <div className="flex justify-end">
        <div className="relative inline-block">
          <button
            ref={langRefs.setReference}
            {...getLangRefProps()}
            className="flex items-center px-2 py-2 text-white rounded"
          >
            <div className="flex cursor-pointer items-center py-1 hover:text-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span className="mx-1">Tiếng việt</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </button>
          <AnimatePresence>
            {openLanguage && (
              <motion.div
                ref={langRefs.setFloating}
                style={langStyles}
                {...getLangFloatingProps()}
                key="dropdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  ref={languageArrowRef}
                  className="absolute w-4 h-4 bg-white rotate-45 z-[1]"
                  style={{
                    left:
                      langMiddleware.arrow?.x != null
                        ? `${langMiddleware.arrow.x}px`
                        : "",
                    top:
                      langMiddleware.arrow?.y != null
                        ? `${langMiddleware.arrow.y}px`
                        : "",
                    [languagePlacement.startsWith("top") ? "bottom" : "top"]:
                      "-8px",
                  }}
                />
                <div className="relative rounded-sm  border-gray-200 bg-white shadow-md whitespace-nowrap">
                  <div className="flex flex-col py-2 pr-28 pl-3">
                    <button className="py-2 px-3 text-left text-black hover:text-orange-500 ">
                      Tiếng Việt
                    </button>
                    <button className="mt-2 py-2 px-3 text-left text-black hover:text-orange-500">
                      English
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* <div className="flex cursor-pointer items-center py-1 hover:text-white/70">
            <div className="mr-1 h-6 w-6 flex-shrink-0">
              <img
                src="data:image/jpeg;base64,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"
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>Tấn Kiên</div>
          </div> */}
        {isAuthenticated && (
          <div className="relative inline-block">
            <button
              ref={userRefs.setReference}
              {...getUserRefProps()}
              className="flex items-center px-2 py-2 text-white rounded"
            >
              <div className="flex cursor-pointer items-center py-1 hover:text-white/70">
                <div className="mr-1 h-6 w-6 flex-shrink-0">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>{profile?.email}</div>
              </div>
            </button>
            <AnimatePresence>
              {openUser && (
                <motion.div
                  ref={userRefs.setFloating}
                  style={{ ...userStyles, zIndex: 50 }}
                  {...getUserFloatingProps()}
                  key="dropdown"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    ref={userArrowRef}
                    className="absolute w-4 h-4 bg-white rotate-45"
                    style={{
                      left:
                        userMiddleware.arrow?.x != null
                          ? `${userMiddleware.arrow.x}px`
                          : "",
                      top:
                        userMiddleware.arrow?.y != null
                          ? `${userMiddleware.arrow.y}px`
                          : "",
                      [userPlacement.startsWith("top") ? "bottom" : "top"]:
                        "-8px",
                    }}
                  />
                  <div className="relative rounded-sm  border-gray-200 bg-white shadow-md whitespace-nowrap ">
                    <div className="flex flex-col items-start py-2 pl-3 pr-5 whitespace-nowrap ">
                      <Link
                        to="/profile"
                        className="py-2 px-3 text-left text-black hover:text-orange-500"
                      >
                        Tài khoản của tôi
                      </Link>
                      <Link
                        to="/"
                        className="mt-2 py-2 px-3 text-left text-black hover:text-orange-500"
                      >
                        Đơn mua
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="mt-2 py-2 px-3 text-left text-black hover:text-orange-500"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {!isAuthenticated && (
          <div className="flex items-center">
            <Link
              to="/register"
              className="mx-3 capitalize hover:text-white/70 h-4"
            >
              Đăng kí
            </Link>
            <Link
              to="/login"
              className="mx-3 capitalize hover:text-white/70 h-4"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
