-- CreateTable
CREATE TABLE "historical_entities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT,
    "years" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "image" TEXT,
    "short_bio" TEXT,
    "full_bio" TEXT,
    "artistic_details" TEXT,
    "importance" TEXT,
    "sector" TEXT,
    "sources" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historical_entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guided_routes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT,
    "distance" TEXT,
    "category" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guided_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guided_route_stops" (
    "id" SERIAL NOT NULL,
    "route_id" TEXT NOT NULL,
    "entity_id" TEXT,
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT,
    "sector" TEXT,

    CONSTRAINT "guided_route_stops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "historical_entities_category_idx" ON "historical_entities"("category");

-- CreateIndex
CREATE INDEX "guided_route_stops_route_id_idx" ON "guided_route_stops"("route_id");

-- CreateIndex
CREATE UNIQUE INDEX "guided_route_stops_route_id_position_key" ON "guided_route_stops"("route_id", "position");

-- AddForeignKey
ALTER TABLE "guided_route_stops" ADD CONSTRAINT "guided_route_stops_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "guided_routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guided_route_stops" ADD CONSTRAINT "guided_route_stops_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "historical_entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
