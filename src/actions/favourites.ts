"use server";

import { TvShowDetails } from "@/app/types";
import { auth } from "@/auth";
import { favourites, users } from "@/schema";
import { and, eq } from "drizzle-orm";
import { PgInsertValue } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getShowDetails } from "./shows";

const connectionString = process.env.DATABASE_URL;
// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString || "", { prepare: false });
const db = drizzle(client);

const getUserId = async () => {
  const session = await auth();
  if (!session?.user?.email) return;
  const usersSelect = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email));
  if (usersSelect.length === 0) {
    const newUser = await db
      .insert(users)
      .values({ email: session.user.email })
      .returning({ insertedId: users.id });
    return newUser[0]?.insertedId;
  }
  return usersSelect[0]?.id;
};

export const toggleFavourite = async (showId: number) => {
  const userId = await getUserId();
  if (!userId) return;
  const favouriteResults = await db
    .select()
    .from(favourites)
    .where(and(eq(favourites.userId, userId), eq(favourites.showId, showId)));
  if (favouriteResults.length) {
    await deleteFavourite({ showId, userId });
    return;
  }
  await addFavourite({ showId, userId });
};

const addFavourite = async (values: PgInsertValue<typeof favourites>) => {
  await db.insert(favourites).values(values);
};

const deleteFavourite = async ({
  showId,
  userId,
}: {
  showId: number;
  userId: number;
}) => {
  await db
    .delete(favourites)
    .where(and(eq(favourites.userId, userId), eq(favourites.showId, showId)));
};

export const getFavourites = async (): Promise<TvShowDetails[]> => {
  const userId = await getUserId();
  if (!userId) return [];
  const shows = await db
    .select({ id: favourites.showId })
    .from(favourites)
    .where(eq(favourites.userId, userId));

  const promises = shows.map((s) => getShowDetails(s.id));
  return await Promise.all(promises);
};

export const isFavourite = async (id: number): Promise<boolean> => {
  const userId = await getUserId();
  if (!userId) return false;
  const shows = await db
    .select({ id: favourites.showId })
    .from(favourites)
    .where(and(eq(favourites.userId, userId), eq(favourites.showId, id)));

  return shows.length > 0;
};
