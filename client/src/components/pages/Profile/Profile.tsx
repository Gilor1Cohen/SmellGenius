import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import GoldBtn from "../../ui/goldBtn/goldBtn";
import axios from "axios";
import type { likesList } from "../../../types/Perfumes.types";
import EditProfile from "../../ui/editProfile/editProfile";

import "./Profile.css";
import EditPassword from "../../ui/editPassword/editPassword";

export default function Profile() {
  const [editUserDetail, setEditUserDetail] = useState<boolean>(false);

  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editPasswordLoading, setEditPasswordLoading] =
    useState<boolean>(false);

  const [perfumesData, setPerfumesData] = useState<string[] | null>(null);
  const [morePerfumesData, setMorePerfumesData] = useState<boolean>(false);
  const [perfumesLoading, setPerfumesLoading] = useState<boolean>(false);

  const { user, setUser, setAuth } = useContext(UserContext);

  async function GetPerfumes(amount: number | null): Promise<string[]> {
    try {
      const res = await axios.get<likesList>(
        "http://localhost:5174/Perfumes/GetUserLikes",
        { params: { amount }, withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if ([404, 400, 500].includes(status)) return [];

        if ([401, 403].includes(status)) {
          setAuth(false);
          setUser(null);
          return [];
        }
      }

      return [];
    }
  }

  useEffect(() => {
    async function fetchInitial() {
      setPerfumesLoading(true);
      try {
        const data = await GetPerfumes(3);
        setPerfumesData(data);
      } catch (error: any) {
        setPerfumesData([]);
      } finally {
        setPerfumesLoading(false);
      }
    }

    fetchInitial();
  }, []);

  useEffect(() => {
    if (!morePerfumesData) return;
    async function fetchInitial() {
      setPerfumesLoading(true);
      try {
        const data = await GetPerfumes(null);
        setPerfumesData(data);
      } catch (error: any) {
        setPerfumesData([]);
      } finally {
        setPerfumesLoading(false);
      }
    }

    fetchInitial();
  }, [morePerfumesData]);

  return (
    <section id="ProfileSection">
      <div className="ProfileBoxes">
        <h1 id="profile-card__greeting">{user?.Name}</h1>

        {editUserDetail ? (
          <EditProfile setEditUserDetail={setEditUserDetail} />
        ) : (
          <div className="ProfileBox">
            <p className="profile-card__detail">
              <span className="profile-card__label">Email:</span>
              <span className="profile-card__value">{user?.Email}</span>
            </p>
            <p className="profile-card__detail">
              <span className="profile-card__label">Year of Birth:</span>
              <span className="profile-card__value">{user?.YearOfBirth}</span>
            </p>
            <p className="profile-card__detail">
              <span className="profile-card__label">Gender:</span>
              <span className="profile-card__value">{user?.Gender}</span>
            </p>
            <p className="profile-card__detail">
              <span className="profile-card__label">Likes:</span>
              <span className="profile-card__value">
                {user?.FavoritePerfumes} Perfumes
              </span>
            </p>
            <p
              className="gold Edit"
              onClick={() => {
                setEditUserDetail(true);
              }}
            >
              Edit
            </p>
          </div>
        )}

        <div className="ProfileBox">
          <h1 id="Perfumes-h">Your Perfumes</h1>

          {perfumesLoading ? (
            <p id="loadingPerfumes">Loading</p>
          ) : perfumesData ? (
            perfumesData.length > 0 ? (
              <div id="perfumesBox">
                {perfumesData.map((perfume: string) => (
                  <p className="perfumesData-p" key={perfume}>
                    {perfume}
                  </p>
                ))}

                {perfumesData.length === 3 && (
                  <GoldBtn
                    text="More"
                    type="button"
                    onClick={() => {
                      setMorePerfumesData(true);
                    }}
                  />
                )}
              </div>
            ) : (
              <p id="NoLikes">You have no likes.</p>
            )
          ) : (
            <></>
          )}

          <p className="gold Perfumes">Add Perfumes</p>
        </div>

        {editPassword && (
          <EditPassword
            setEditPassword={setEditPassword}
            editPasswordLoading={editPasswordLoading}
            setEditPasswordLoading={setEditPasswordLoading}
          />
        )}

        <div id="ProfilePageBottom">
          <p
            className="gold Password"
            onClick={() => {
              if (editPasswordLoading) return;
              setEditPassword((prev) => !prev);
            }}
          >
            Change Password
          </p>

          <GoldBtn
            text="Log Out"
            type="button"
            className="LogOut"
            onClick={async function LogOut() {
              try {
                const res = await axios.post<any>(
                  "http://localhost:5174/Auth/LogOut",
                  {},
                  { withCredentials: true }
                );

                if (res.status == 200) {
                  setAuth(false);
                  setUser(null);
                }

                return;
              } catch (error) {
                return;
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
